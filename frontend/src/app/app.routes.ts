import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Autocadastro } from './pages/cliente/autocadastro/autocadastro';
import { TelaInicial } from './pages/cliente/tela-inicial/tela-inicial';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'autocadastro', component: Autocadastro},
    { path: 'tela-inicial', component: TelaInicial}
];
