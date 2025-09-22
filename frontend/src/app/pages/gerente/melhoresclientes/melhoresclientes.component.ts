import { Component } from '@angular/core';
import { Cliente } from '../../../shared/models/cliente.model';
import { AuthService } from '../../../services/auth-service';
import { ClienteService } from '../../../services/cliente-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-melhoresclientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './melhoresclientes.component.html',
  styleUrl: './melhoresclientes.component.css'
})
export class MelhoresclientesComponent implements OnInit {

  melhores: Cliente[] = [];
  cpfLogado: string = '';

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cpfLogado = this.authService.getCpfLogado();

    const clientes = this.clienteService.listarClientesLocalStorage();

    // 🔹 Filtra apenas os clientes do gerente logado
    const meusClientes = clientes.filter(c => c.cpfGerente === this.cpfLogado && c.estado === 'Aprovado');

    // 🔹 Ordena decrescente por saldo
    this.melhores = meusClientes
      .sort((a, b) => b.saldo - a.saldo)
      .slice(0, 3); // pega só os 3 primeiros
  }
}
