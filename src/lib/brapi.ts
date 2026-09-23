import type { Acao } from "@/types/acao";

// Bug B13 (fix): a brapi retorna campos com nomes diferentes da nossa
// interface Acao (symbol, shortName, regularMarketPrice, ...). Sem essa
// normalização, o front-end recebia acao.preco === undefined sempre que
// os dados vinham da brapi (e só funcionava com o mock, por coincidência).
export function normalizeAcao(raw: any): Acao {
  return {
    ticker: raw.symbol ?? raw.ticker,
    nome: raw.shortName ?? raw.nome,
    preco: raw.regularMarketPrice ?? raw.preco,
    variacao: raw.regularMarketChangePercent ?? raw.variacao ?? 0,
    volume: raw.regularMarketVolume ?? raw.volume ?? 0,
    logo: raw.logourl ?? raw.logo,
  };
}