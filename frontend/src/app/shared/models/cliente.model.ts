import { Pessoa } from './pessoa.model';

export class Cliente extends Pessoa {

    public estado?: 'Aprovado' | 'Rejeitado';
    public motivoRecusa?: string;
    public dataRejeicao?: string;
    
    constructor(
        cpf: string,
        nome: string,
        email: string,
        telefone: string,
        public salario: number,
        public endereco: string,
        public cep: string,
        public complemento: string,
        public numero: string
    ) {
        super(cpf, nome, email, telefone); 
    }
}
