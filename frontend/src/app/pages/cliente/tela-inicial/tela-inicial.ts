import { Component } from '@angular/core';
import { TelaInicialService } from '../../../services/tela-inicial-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tela-inicial.html',
  styleUrl: './tela-inicial.css'
})
export class TelaInicial {
 
  saldo: number = 0;
  valorOperacao: number = 0;
  acaoSelecionada: string | null = null;

  selecionarAcao(acao: string) {
    this.acaoSelecionada = acao;
  }

  depositar() {
    if (this.valorOperacao > 0) {
      this.saldo += this.valorOperacao;
      this.valorOperacao = 0;
    }
  }

  sacar() {
    if (this.valorOperacao > 0) {
      this.saldo -= this.valorOperacao;
      this.valorOperacao = 0;
    }
  }

  transferir() {
    if (this.valorOperacao > 0) {
      this.saldo -= this.valorOperacao;
      this.valorOperacao = 0;
      // selecionar a conta para receber a transferência
    }
  }

  consultarExtrato() {
    // implementação futura
  }
}