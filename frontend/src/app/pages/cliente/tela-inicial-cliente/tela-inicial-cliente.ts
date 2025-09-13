import { Component, OnInit } from '@angular/core';
import { TelaInicialService } from '../../../services/tela-inicial-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../shared/models/cliente.model';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tela-inicial-cliente.html',
  styleUrl: './tela-inicial-cliente.css'
})
export class TelaInicialCliente implements OnInit {
  
  usuario: Cliente | null = null;
  saldo: number = 0;
  valorOperacao: number = 0;
  acaoSelecionada: string | null = null;
  mensagem: string = '';

  constructor(private telaService: TelaInicialService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuarioLogado();
    // Se houver um usuário logado, pega o saldo
    if (this.usuario) {
      this.saldo = this.usuario.saldo;
    } else {
      this.mensagem = 'Nenhum usuário autenticado.';
    }
  }

  depositar() {
    if (this.valorOperacao > 0) {
      this.telaService.depositar(this.valorOperacao);
      this.saldo = this.telaService.obterSaldo();
      this.mensagem = `Depósito de R$${this.valorOperacao} realizado com sucesso.`;
      this.valorOperacao = 0;
    }
  }

  sacar() {
    if (this.valorOperacao > 0) {
      const sucesso = this.telaService.sacar(this.valorOperacao);
      if (sucesso) {
        this.saldo = this.telaService.obterSaldo();
        this.mensagem = `Saque de R$${this.valorOperacao} realizado com sucesso.`;
      } else {
        this.mensagem = 'Saldo insuficiente para saque.';
      }
      this.valorOperacao = 0;
    }
  }

  transferir() {
    if (this.valorOperacao > 0) {
      const sucesso = this.telaService.transferir(this.valorOperacao);
      if (sucesso) {
        this.saldo = this.telaService.obterSaldo();
        this.mensagem = `Transferência de R$${this.valorOperacao} realizada com sucesso.`;
      } else {
        this.mensagem = 'Saldo insuficiente para transferência.';
      }
      this.valorOperacao = 0;
    }
  }

  consultarExtrato() {
    const extrato = this.telaService.obterExtrato();
    console.log('Extrato do cliente:', extrato);
    this.mensagem = `Foram encontradas ${extrato.length} operações no extrato.`;
  }
}
