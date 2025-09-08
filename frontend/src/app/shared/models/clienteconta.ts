import { Cliente } from './cliente.model';

export class ClienteConta extends Cliente {
  constructor(
    cpf: string,
    nome: string,
    email: string,
    telefone: string,
    salario: number,
    endereco: string,
    cep: string,
    complemento: string,
    numero: string,
    public saldo: number,
    public limite: number,
    public cidade: string,
    public uf: string   // mudei para `uf` para não conflitar com `estado` do cliente
  ) {
    super(cpf, nome, email, telefone, salario, endereco, cep, complemento, numero);
  }
}
