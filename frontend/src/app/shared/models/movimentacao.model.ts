export class Movimentacao {
    constructor(
        public tipo: 'deposito' | 'saque' | 'transferencia',
        public valor: number,
        public data: Date,
        public hora: string,
        public contaOrigem?: string,
        public contaDestino?: string
    ) {}
}
