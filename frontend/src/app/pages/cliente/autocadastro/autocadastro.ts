import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../shared/models/cliente.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente-service';
import { NgxMaskDirective } from 'ngx-mask';


@Component({

  selector: 'app-autocadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './autocadastro.html',
  styleUrl: './autocadastro.css'

})

export class Autocadastro {

  // Lista de estados brasileiros para popular o campo de seleção
  estadosBrasileiros = [
    { nome: 'Acre', sigla: 'AC' },
    { nome: 'Alagoas', sigla: 'AL' },
    { nome: 'Amapá', sigla: 'AP' },
    { nome: 'Amazonas', sigla: 'AM' },
    { nome: 'Bahia', sigla: 'BA' },
    { nome: 'Ceará', sigla: 'CE' },
    { nome: 'Distrito Federal', sigla: 'DF' },
    { nome: 'Espírito Santo', sigla: 'ES' },
    { nome: 'Goiás', sigla: 'GO' },
    { nome: 'Maranhão', sigla: 'MA' },
    { nome: 'Mato Grosso', sigla: 'MT' },
    { nome: 'Mato Grosso do Sul', sigla: 'MS' },
    { nome: 'Minas Gerais', sigla: 'MG' },
    { nome: 'Pará', sigla: 'PA' },
    { nome: 'Paraíba', sigla: 'PB' },
    { nome: 'Paraná', sigla: 'PR' },
    { nome: 'Pernambuco', sigla: 'PE' },
    { nome: 'Piauí', sigla: 'PI' },
    { nome: 'Rio de Janeiro', sigla: 'RJ' },
    { nome: 'Rio Grande do Norte', sigla: 'RN' },
    { nome: 'Rio Grande do Sul', sigla: 'RS' },
    { nome: 'Rondônia', sigla: 'RO' },
    { nome: 'Roraima', sigla: 'RR' },
    { nome: 'Santa Catarina', sigla: 'SC' },
    { nome: 'São Paulo', sigla: 'SP' },
    { nome: 'Sergipe', sigla: 'SE' },
    { nome: 'Tocantins', sigla: 'TO' }
  ];

  constructor(private router: Router, private clienteService: ClienteService) { }

  cliente: Cliente = new Cliente(
    '', // cpf
    '', // nome
    '', // email
    '', // telefone
    0,  // salario
    '', // endereco
    '', // cep
    '', // complemento
    '', // numero
    '', // bairro
    '', // cidade
    '', // uf
    0,  // saldo
    0   // limite
  );

  cadastrarUsuarioLocalStorage(form: NgForm){
    if (form.invalid) {
      console.log("Formulário inválido, preencha todos os campos obrigatórios!");
      return;
    } else {
      const salarioString = String(this.cliente.salario)
        .replace(/\./g, '')      // remove separador de milhar
        .replace(',', '.')       // substitui vírgula por ponto decimal
        .replace('R$', '')       // remove prefixo, se houver
        .trim();

      this.cliente.salario = parseFloat(salarioString);
      this.clienteService.salvarClientesTempLocalStorage(this.cliente);
      alert('Cliente cadastrado com sucesso!');
      this.limparFormulario(form);      
      this.voltarLogin();
    }
  }

  limparFormulario(form: NgForm) {
    form.reset();
  }

  voltarLogin() {
    this.router.navigate(['login']);
  }

  consultaCEP() {
   console.log(this.cliente.cep)
  }
}

