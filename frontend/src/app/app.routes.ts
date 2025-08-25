import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Autocadastro } from './pages/cliente/autocadastro/autocadastro';
import { TelaInicial } from './pages/cliente/tela-inicial/tela-inicial';
import { AlterarPerfilComponent } from './pages/cliente/alteracao-de-perfil/alteracao-de-perfil';
import { Depositar } from './pages/cliente/depositar/depositar';
import { Saque } from './pages/cliente/saque/saque';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'autocadastro', component: Autocadastro},
    { path: 'tela-inicial', component: TelaInicial},
    {path: 'alteraco-perfil', component: AlterarPerfilComponent},
    {path: 'deposito', component: Depositar},
    {path: 'saque', component: Saque}
];
