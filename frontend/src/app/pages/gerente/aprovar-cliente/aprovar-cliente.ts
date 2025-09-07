import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../shared/models/cliente.model';


@Component({
  selector: 'app-aprovar-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './aprovar-cliente.html',
  styleUrl: './aprovar-cliente.css'
})
export class AprovarCliente {

clientesPendentes: (Cliente & { aprovado?: boolean, conta?: string, limite?: number })[] = [
    new Cliente("123.456.789-00", "João da Silva", "joao@email.com", "11999999999", 1800, "Rua A", "00000-000", "Apto 1", "123"),
    new Cliente("987.654.321-00", "Maria Oliveira", "maria@email.com", "11888888888", 2500, "Rua B", "11111-111", "Casa", "456")
  ];

  mensagem: string = '';
  sucesso: boolean = false;

  aprovar(cliente: Cliente & { aprovado?: boolean, conta?: string, limite?: number }) {
    const conta = Math.floor(1000 + Math.random() * 9000).toString();

    const senha = Math.random().toString(36).slice(-8);

    const limite = cliente.salario >= 2000 ? cliente.salario / 2 : 0;
    cliente.aprovado = true;
    cliente.conta = conta;
    cliente.limite = limite;

    console.log(`📧 Enviado e-mail para ${cliente.email} com a senha: ${senha}`);

    this.mensagem = `Cliente ${cliente.nome} aprovado! Conta: ${conta}, Limite: R$ ${limite.toFixed(2)}. Senha enviada por e-mail.`;
    this.sucesso = true;
  }
}