import { Component } from '@angular/core';
import { TelaInicialService } from '../../../services/tela-inicial-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tela-inicial-cliente.html',
  styleUrl: './tela-inicial-cliente.css'
})
export class TelaInicialCliente {
 
  saldo: number = 0;
  valorOperacao: number = 0;
  acaoSelecionada: string | null = null;

  consultarExtrato() {
    // implementação futura
  }
}