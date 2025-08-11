import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Autocadastro } from './pages/autocadastro/autocadastro';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'autocadastro', component: Autocadastro},
];
