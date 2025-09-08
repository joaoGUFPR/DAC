import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Autocadastro } from './pages/cliente/autocadastro/autocadastro';
import { TelaInicialCliente } from './pages/cliente/tela-inicial-cliente/tela-inicial-cliente';
import { TelaInicialGerente } from './pages/gerente/tela-inicial-gerente/tela-inicial-gerente';
import { AlterarPerfilComponent } from './pages/cliente/alteracao-de-perfil/alteracao-de-perfil';
import { Depositar } from './pages/cliente/depositar/depositar';
import { Saque } from './pages/cliente/saque/saque';
import { AprovarCliente } from './pages/gerente/aprovar-cliente/aprovar-cliente';
import { ModalRejeitarClienteComponent } from './pages/gerente/modal-rejeitarcliente/modal-rejeitarcliente';
import { ConsultarClientes } from './pages/gerente/consultar-clientes/consultar-clientes';
import { TelaInicialAdm } from './pages/adm/tela-inicial-adm/tela-inicial-adm';
import { RelatorioCliente } from './pages/adm/relatorio-cliente/relatorio-cliente';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'autocadastro', component: Autocadastro},
    { path: 'cliente/tela-inicial', component: TelaInicialCliente},
    { path: 'alteraco-perfil', component: AlterarPerfilComponent},
    { path: 'deposito', component: Depositar},
    { path: 'saque', component: Saque},
    { path: 'gerente/tela-inicial', component: TelaInicialGerente},
    { path: 'gerente/aprovar-cliente', component: AprovarCliente},
    { path: 'gerente/consultar-cliente', component: ConsultarClientes},
    { path: 'administrador/tela-inicial-adm', component: TelaInicialAdm},
    { path: 'administrador/relatorio-cliente', component: RelatorioCliente}
];
