import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';

const LS_CHAVE = "clientes"

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

  listarClientesLocalStorage(): Cliente[]{
    const clientes = localStorage[LS_CHAVE];
    return clientes ? JSON.parse(clientes) : [];
  }

  salvarClienteLocalStorage(cliente: Cliente) {
    const clientes = this.listarClientesLocalStorage();
    clientes.push(cliente);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

}