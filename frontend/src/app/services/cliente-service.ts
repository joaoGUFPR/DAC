import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';

const LS_CHAVE = "clientes"
const LS_CHAVE_TEMP = "clientesPendentes"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  // endereço da api de microserviço
  private readonly API_URL = 'http://localhost:8080/clientes';
  cliente: Cliente | null = null;
  constructor(private http: HttpClient) { }

  
  buscaCep(cep: string) {
    //lembrar que uma chamada HTTP não é instantânea, ela retorna um "Observable"
    return this.http.get(`${this.API_URL}/cep/${cep}`);
  }

  listarClientesLocalStorage(CHAVE: string): Cliente[]{
    const clientes = localStorage[CHAVE];
    return clientes ? JSON.parse(clientes) : [];
  }
  //lista temporaria para clientes pendentes de aprovação
  salvarClientesTempLocalStorage(cliente: Cliente) {
    const clientesExistentes = this.listarClientesLocalStorage(LS_CHAVE_TEMP);
    clientesExistentes.push(cliente);
    localStorage[LS_CHAVE_TEMP] = JSON.stringify(clientesExistentes);
  }

  salvarClienteLocalStorage(cliente: Cliente) {
    //log de controle, apagar na versão final
    console.log(cliente)
    //##
    const clientes = this.listarClientesLocalStorage(LS_CHAVE);
    clientes.push(cliente);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }
  
  getSaldo(cliente: Cliente): number {
    const clientes = this.listarClientesLocalStorage(LS_CHAVE);
    const clienteEncontrado = clientes.find(c => c.cpf === cliente.cpf);
    return clienteEncontrado ? clienteEncontrado.saldo : 0;
  }

  depositar(cliente: Cliente, valor: number): void {
    const clientes = this.listarClientesLocalStorage(LS_CHAVE);
    const index = clientes.findIndex(c => c.cpf === cliente.cpf);
    if (index !== -1 && valor > 0) {
      clientes[index].saldo += valor;
      localStorage[LS_CHAVE] = JSON.stringify(clientes);
    }
  }

  sacar(cliente: Cliente, valor: number): boolean {
    const clientes = this.listarClientesLocalStorage(LS_CHAVE);
    const index = clientes.findIndex(c => c.cpf === cliente.cpf);
    if (index !== -1 && valor > 0 && clientes[index].saldo >= valor) {
      clientes[index].saldo -= valor;
      localStorage[LS_CHAVE] = JSON.stringify(clientes);
      return true;
    }
    return false;
  }

  getClienteByCpf(cpf: string): Cliente | undefined {
    const clientes = this.listarClientesLocalStorage(LS_CHAVE);
    return clientes.find(c => c.cpf === cpf);
  }

  atualizarCliente(clienteAtualizado: Cliente): void {
    const clientes = this.listarClientesLocalStorage(LS_CHAVE);
    const index = clientes.findIndex(c => c.cpf === clienteAtualizado.cpf);
    if (index !== -1) {
      clientes[index] = clienteAtualizado;
      localStorage[LS_CHAVE] = JSON.stringify(clientes);
    }
  }

  removerCliente(cpf: string): void {
    let clientes = this.listarClientesLocalStorage(LS_CHAVE);
    clientes = clientes.filter(c => c.cpf !== cpf);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  transferir(sacadorCpf: string, cpf: string, valor: number): boolean {
    throw new Error('Method not implemented.');
    return true;
  }

}