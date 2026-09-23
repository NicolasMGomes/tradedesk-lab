import { NextResponse } from "next/server";
import { ACOES_MOCK } from "@/lib/mocks";
import { normalizeAcao } from "@/lib/brapi";

const TICKERS = "PETR4,VALE3,ITUB4,MGLU3,BBDC4";

// Para usar dados reais da brapi.dev:
// 1. Crie conta gratuita em https://brapi.dev/account e copie seu token
// 2. Crie .env.local na raiz do projeto com: BRAPI_TOKEN=seu_token_aqui
// 3. Substitua a linha do fetch abaixo por:
//    const res = await fetch(`https://brapi.dev/api/quote/${TICKERS}?token=${process.env.BRAPI_TOKEN}&fundamental=false`, ...)
// Campos retornados pela brapi: symbol | shortName | regularMarketPrice | regularMarketChangePercent | regularMarketVolume

export async function GET() {
  try {
    const res = await fetch(`https://brapi.dev/api/quote/${TICKERS}?fundamental=false`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("brapi offline");
    const data = await res.json();
    return NextResponse.json((data.results ?? []).map(normalizeAcao));
  } catch {
    // brapi indisponivel ou token nao configurado — retornando dados mock
    console.info("[/api/acoes] brapi.dev indisponível - exibindo dados mock.")
    return NextResponse.json(ACOES_MOCK);
  }
}
