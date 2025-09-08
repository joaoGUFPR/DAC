import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Autocadastro } from './pages/cliente/autocadastro/autocadastro';
import { TelaInicialCliente } from './pages/cliente/tela-inicial-cliente/tela-inicial-cliente';
import { TelaInicialGerente } from './pages/gerente/tela-inicial-gerente/tela-inicial-gerente';
import { AlterarPerfilComponent } from './pages/cliente/alteracao-de-perfil/alteracao-de-perfil';
import { Depositar } from './pages/cliente/depositar/depositar';
import { Saque } from './pages/cliente/saque/saque';
import { TelaInicialAdministrador } from './pages/administrador/tela-inicial-administrador/tela-inicial-administrador';
import { VisualizarClientes } from './pages/gerente/visualizar-clientes/visualizar-clientes';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'autocadastro', component: Autocadastro},
    { path: 'cliente/tela-inicial', component: TelaInicialCliente},
    { path: 'alteracao-perfil', component: AlterarPerfilComponent},
    { path: 'deposito', component: Depositar},
    { path: 'saque', component: Saque},
    { path: 'gerente/tela-inicial', component: TelaInicialGerente},
    { path: 'administrador/tela-inicial', component: TelaInicialAdministrador},
    { path: 'gerente/visualizar-clientes', component: VisualizarClientes}
];