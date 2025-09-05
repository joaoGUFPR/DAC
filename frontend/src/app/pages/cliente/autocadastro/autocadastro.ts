import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../shared/models/cliente.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente-service';


@Component({

  selector: 'app-autocadastro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './autocadastro.html',
  styleUrl: './autocadastro.css'

})

export class Autocadastro {


  // injeção das dependências

  constructor(private router: Router,

    private clienteService: ClienteService) { }


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

  cadastrarUsuarioLocalStorage(form: NgForm){
    if (form.invalid) {
      console.log("Formulário inválido, preencha todos os campos obrigatórios!");
      return;
    }else{
      this.clienteService.salvarClienteLocalStorage(this.cliente);
      alert('Cliente cadastrado com sucesso!');
      this.limparFormulario(form);      
      this.voltarLogin();
    }
  }

  cadastrarUsuario(form: NgForm) {
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

  voltarLogin() {
    this.router.navigate(['login']);
  }

  consultaCEP() {
    /*
    //chamo o microserviço para buscar o CEP
    const cep = this.cliente.cep;
    //recebo o observable porém só pego os dados de interesse (motivo do 'any')
    this.clienteService.buscaCep(cep).subscribe((dadosCep: any) => {
      //em caso de sucesso
      if (dadosCep && !dadosCep.erro) {
        this.cliente.endereco = dadosCep.logradouro;
        this.cliente.cep = dadosCep.cep;
      } else {
        // CEP inválido ou não encontrado
        console.log('Digite um CEP válido.');
      }

    });
    */
   console.log(this.cliente.cep)
  }

} 