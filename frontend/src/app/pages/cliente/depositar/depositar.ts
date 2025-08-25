import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-depositar',
  imports: [FormsModule, CommonModule],
  templateUrl: './depositar.html',
  styleUrl: './depositar.css'
})
export class Depositar {
  valorDeposito: number = 0;
  saldoAtual: number = 200; 
  mensagem: string = '';

  depositar() {
    if (this.valorDeposito > 0) {
      this.saldoAtual += this.valorDeposito;
      this.mensagem = `Depósito de R$ ${this.valorDeposito} realizado com sucesso!`;
      this.valorDeposito = 0;
    } else {
      this.mensagem = 'Informe um valor válido para depósito.';
    }
  }
}