import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente-service';
import { Cliente } from '../../shared/models/cliente.model';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  credenciais = {email:'', senha:'tads'}; //guarda email e senha que vem do HTML
  mensagemErro = ""; //mensagem de falha de login
  listaClientes: Cliente[] = []; // lista de clientes

  constructor(private router: Router, private clienteService: ClienteService, private authService: AuthService) { }  

  fazerLogin(){
    this.listaClientes = this.clienteService.listarClientesLocalStorage();
    const clienteEncontrado = this.listaClientes.find(cliente => 
      cliente.email === this.credenciais.email);
    if (clienteEncontrado && this.credenciais.senha === 'tads'){
      this.authService.login('cliente');
      this.router.navigate(['/cliente/tela-inicial']);
    } else {
      this.mensagemErro = "E-mail ou senha inválidos.";
    }
  }
}//end class