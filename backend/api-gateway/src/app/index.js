require("dotenv-safe").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const httpProxy = require("express-http-proxy");
const rateLimit = require("express-rate-limit")
const winston = require("winston");
const app = express();
const helmet = require("helmet");
const logger = require("morgan");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.SECRET;

// Criação do logger
const apiLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

app.use((req, res, next) => {
    apiLogger.info('Request Received', {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    })
    next();
});

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Criação do limitador de taxa
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        apiLogger.warn('Rate Limit Exceeded', { ip: req.ip, url: req.originalUrl });
        res.status(429).json({ message: "Muitas requisições. Tente novamente após 15 minutos." });
    }
})

app.use(limiter);

// Declaração dos proxys para os MS
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'] || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
        apiLogger.warn('Authentication Failed: No Token', { ip: req.ip, url: req.originalUrl });
        return res.status(401).json({ auth: false, message: 'Token não fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, function(err, decoded) {
        if (err) {
            apiLogger.error('Authentication Failed: Invalid Token', { ip: req.ip, url: req.originalUrl, error: err.message });
            return res.status(403).json({ auth: false, message: 'Falha ao autenticar o token.' })
        }

        req.userId = decoded.id;
        req.userType = decoded.tipo;
        apiLogger.info('Athentication Successful', { userId: req.userId, userType: req.userType, url: req.originalUrl });
        next();
    });
}

// Mapeamento de rotas para os MS
const services = {
    auth:    { path: '/auth',     target: process.env.AUTH_MS_URL },
    cliente: { path: '/clientes', target: process.env.CLIENTE_MS_URL },
    gerente: { path: '/gerentes', target: process.env.GERENTE_MS_URL },
    conta:   { path: '/contas',   target: process.env.CONTA_MS_URL },
    admin:   { path: '/admin',    target: process.env.ADMIN_MS_URL },
};

// Propagação do usuário logado
const createServiceProxy = (target, serviceName) => httpProxy(target, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        if (srcReq.userId) {
            proxyReqOpts.headers['X-User-ID'] = srcReq.userId;
            proxyReqOpts.headers['X-User-Type'] = srcReq.userType;
        }
        apiLogger.info('Proxy Request Forwarded', { 
            service: serviceName, 
            method: srcReq.method, 
            url: srcReq.originalUrl, 
            userId: srcReq.userId 
        });
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        apiLogger.info('Proxy Response Received', { 
            service: serviceName, 
            statusCode: proxyRes.statusCode, 
            method: userReq.method, 
            url: userReq.originalUrl,
            userId: userReq.userId
        });
        return proxyResData;
    },
    proxyErrorHandler: (err, res, next) => {
        apiLogger.error('Proxy Error: Service Unavailable', { 
            service: serviceName, 
            code: err.code, 
            message: err.message, 
            url: res.req.path 
        });
        res.status(503).json({ message: `Serviço ${serviceName} indisponível no momento.` });
    }
});


// Interceptação de tráfego e redirecionamento para o MS correto
app.post('/login', createServiceProxy(services.auth.target, 'Auth'));

app.post('/clientes/autocadastro', createServiceProxy(services.cliente.target, 'Cliente'));

app.use(verifyJWT);

app.use(services.auth.path, createServiceProxy(services.auth.target, 'Auth'));

app.use(services.cliente.path, createServiceProxy(services.cliente.target, 'Cliente'));

app.use(services.gerente.path, createServiceProxy(services.gerente.target, 'Gerente'));

app.use(services.conta.path, createServiceProxy(services.conta.target, 'Conta'));

app.use(services.admin.path, createServiceProxy(services.admin.target, 'Admin'));

// Log de status do gateway
const server = app.listen(PORT, () => {
    apiLogger.info(`API Gateway rodando na porta ${PORT}`);
    apiLogger.info(`Microsserviços configurados: ${Object.keys(services).join(', ')}`);
});

// Log de status do servidor
server.on('error', (err) => {
    apiLogger.error('Server Error: Failed to start', { error: err.message });
});