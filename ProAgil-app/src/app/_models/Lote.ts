export interface Lote {
         id: number;
         nome: string;
         preco: number;
         dataInicio?: Date;
         dataFim?: Date;  // interrogacao para saber que pode ser not null
         quantidade: number;
         eventoId: number;
}
