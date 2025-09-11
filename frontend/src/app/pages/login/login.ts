import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
//import { ClienteService } from '../../services/cliente-service';
//import { Cliente } from '../../shared/models/cliente.model';
import { AuthService } from '../../services/auth-service';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  credenciaisUsuario = {email:'', senha:'tads'}; //guarda email e senha que vem do HTML
  mensagemErro = ""; //mensagem de falha de login
  
  constructor(private router: Router, private usuarioService: UsuarioService, 
    private authService: AuthService) { }  

  fazerLogin(){
    var listaUsuarios = this.usuarioService.listarTodos();
    var usuarioEncontrado = listaUsuarios.find(usuario => 
      usuario.email === this.credenciaisUsuario.email);
    if (usuarioEncontrado && this.credenciaisUsuario.senha === 'tads'){
      this.authService.login(usuarioEncontrado.papel);
      if(usuarioEncontrado.papel === 'cliente'){
        this.router.navigate(['cliente/tela-inicial']);
      } else if (usuarioEncontrado.papel === 'gerente'){
        this.router.navigate(['gerente/tela-inicial']);
      } else if (usuarioEncontrado.papel === 'admin'){
        this.router.navigate(['administrador/tela-inicial']);
      }
    } else {
      this.mensagemErro = "E-mail ou senha inválidos.";
    }
  }
}//end class