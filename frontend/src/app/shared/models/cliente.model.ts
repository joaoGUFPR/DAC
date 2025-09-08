import { Pessoa } from './pessoa.model';

export class Cliente extends Pessoa {

    public status?: 'Aprovado' | 'Rejeitado';
    public motivoRecusa?: string;
    public dataRejeicao?: string;
    public saldo: number;
    public limite: number;
    
    constructor(
        cpf: string,
        nome: string,
        email: string,
        telefone: string,
        public salario: number,
        public endereco: string,
        public cep: string,
        public complemento: string,
        public numero: string,
        saldo?: number,
        limite?: number
    ) {
        super(cpf, nome, email, telefone); 
        this.saldo = saldo ?? 0;
        this.limite = limite ?? 0;
    }
}
