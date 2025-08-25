import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../shared/models/cliente.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocadastro',
  imports: [FormsModule, CommonModule],
  templateUrl: './autocadastro.html',
  styleUrl: './autocadastro.css'
})
export class Autocadastro {

  constructor(private router: Router) { }

  cliente: Cliente = {
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
    salario: 0,
    endereco: '',
    cep: '',
    complemento: '',
    numero: ''
    }
  

  cadastrarUsuario(form: NgForm){
    console.log(this.cliente);
    if (form.invalid) {
    console.log("Formulário inválido, preencha todos os campos obrigatórios!");
    return;
  }
    this.limparFormulario;
    this.voltarLogin();
    
  }
  limparFormulario(form: NgForm) {
    form.reset(); 
  }

  voltarLogin(){
    this.router.navigate(['login']);
  }
}
