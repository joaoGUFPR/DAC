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

}