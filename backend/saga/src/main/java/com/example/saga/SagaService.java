package com.example.saga.service;

import com.example.saga.events.ClienteCriadoEvent;
import com.example.saga.events.CriarContaEvent;
import com.example.saga.events.ClienteAprovadoEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.saga.config.RabbitConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.util.Map;

@Service
public class SagaService {

    private final RestTemplate http = new RestTemplate();
    private final RabbitTemplate rabbit;

    public SagaService(RabbitTemplate rabbit) {
        this.rabbit = rabbit;
    }

    public void criarLoginNoAuth(ClienteCriadoEvent c) {
        try {
            Map<String, Object> body = Map.of(
                    "cpf", c.cpf(),
                    "nome", c.nome(),
                    "email", c.email(),
                    "senha", c.cpf() // regra simples: senha = cpf
            );

            http.postForObject("http://ms-auth:8080/ms-auth/autocadastrar", body, Void.class);
            System.out.println("🔐 Login criado no ms-auth");
        } catch (Exception e) {
            System.out.println("❌ Erro ao criar login no ms-auth: " + e.getMessage());
            throw e;
        }
    }


    public Long decidirGerente(ClienteCriadoEvent c) {
        try {
            String url = "http://ms-gerente:8082/gerentes/menos-carga";
            Map response = http.getForObject(url, Map.class);

            Long idGerente = Long.valueOf(response.get("id").toString());
            System.out.println("👔 Gerente escolhido -> id = " + idGerente);
            return idGerente;

        } catch (Exception e) {
            System.out.println("❌ Erro ao escolher gerente: " + e.getMessage());
            throw e;
        }
    }

    public CriarContaEvent montarCriacaoConta(ClienteCriadoEvent c) {
        double limite = c.salario() / 2;
        return new CriarContaEvent(c.cpf(), limite);
    }


    public void notificarClienteAprovado(ClienteCriadoEvent c) {
        rabbit.convertAndSend(
                RabbitConfig.EXCHANGE,
                "cliente.aprovado",
                new ClienteAprovadoEvent(c.cpf(), c.salario())
        );
        System.out.println("✅ Cliente aprovado notificado ao ms-cliente");
    }
}
