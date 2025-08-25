import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saque',
  imports: [CommonModule, FormsModule],
  templateUrl: './saque.html',
  styleUrl: './saque.css'
})
export class Saque {

  saldoAtual: number = 1200;  
  limite: number = 1000;    
  valorSaque: number = 0;
  mensagem: string = '';
  sucesso: boolean = false;

  sacar() {
    const saldoDisponivel = this.saldoAtual + this.limite;

    if (this.valorSaque <= 0) {
      this.mensagem = "Digite um valor válido para saque.";
      this.sucesso = false;
      return;
    }

    if (this.valorSaque > saldoDisponivel) {
      this.mensagem = "Saldo insuficiente! Considerando também o limite.";
      this.sucesso = false;
      return;
    }

    this.saldoAtual -= this.valorSaque;
    this.mensagem = `Saque de R$ ${this.valorSaque.toFixed(2)} realizado com sucesso!`;
    this.sucesso = true;
    this.valorSaque = 0;
  }
}
