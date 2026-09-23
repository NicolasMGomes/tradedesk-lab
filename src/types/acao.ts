// As rotas de API normalizam os dados da brapi (symbol, shortName,
// regularMarketPrice, ...) para este formato — ver src/lib/brapi.ts
export interface Acao {
  ticker: string;
  nome: string;
  preco: number;
  variacao: number;
  volume: number;
  logo?: string;
}
