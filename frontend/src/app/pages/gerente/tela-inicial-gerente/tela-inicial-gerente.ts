import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRejeitarClienteComponent } from '../modal-rejeitarcliente/modal-rejeitarcliente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../shared/models/cliente.model';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-inicial-gerente.html',
  styleUrl: './tela-inicial-gerente.css'
})

export class TelaInicialGerente {
  pedidos = [
    { cpf: '123.456.789-00', nome: 'Ana Beatriz Santos', salario: 4250 },
    { cpf: '987.654.321-11', nome: 'Bruno Almeida', salario: 6100 },
    { cpf: '111.222.333-44', nome: 'Carla Nogueira', salario: 3500 },
    { cpf: '555.666.777-88', nome: 'Diego Martins', salario: 7200 },
    { cpf: '222.333.444-55', nome: 'Eduarda Castro', salario: 2950 },
    { cpf: '333.444.555-66', nome: 'Felipe Souza', salario: 5800 },
    { cpf: '444.555.666-77', nome: 'Gabriela Rocha', salario: 4750 },
    { cpf: '555.888.999-00', nome: 'Henrique Lima', salario: 3200 },
    { cpf: '666.777.888-11', nome: 'Isabela Ferreira', salario: 6750 },
    { cpf: '777.888.999-22', nome: 'João Carvalho', salario: 8100 }
  ];

  mensagem: string = '';

  constructor(private modalService: NgbModal) {}

  aprovar(index: number) {
    const pedido = this.pedidos[index];

    const cliente = new Cliente(
      pedido.cpf,
      pedido.nome,
      `${pedido.nome.split(' ')[0].toLowerCase()}@email.com`,
      '11999999999',
      pedido.salario,
      'Endereço padrão',
      '00000-000',
      'Complemento',
      '123',
      'Cidade Padrão',
      'SP',
      pedido.salario,
      pedido.salario / 2
    );
    
    cliente.status = 'Aprovado';

    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]') as Cliente[];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    this.pedidos.splice(index, 1);
    this.mensagem = `Pedido de ${pedido.nome} aprovado com sucesso!`;
  }

  abrirModalRecusar(index: number) {
    const modalRef = this.modalService.open(ModalRejeitarClienteComponent);
    modalRef.componentInstance.cliente = this.pedidos[index];

    modalRef.result.then(
      () => {
        this.pedidos.splice(index, 1);
        this.mensagem = `Pedido de ${modalRef.componentInstance.cliente.nome} foi recusado.`;
      },
      () => {
      }
    );
  }
}