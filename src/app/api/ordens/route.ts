import { NextResponse } from "next/server";
import { ACOES_MOCK, ORDENS_MOCK } from "@/lib/mocks";
import type { Ordem } from "@/types/ordem";

export async function GET() {
  return NextResponse.json(ORDENS_MOCK);
}

export async function POST(req: Request) {
  const body = await req.json();

  const quantidade = Number(body.quantidade);

  if (!Number.isInteger(quantidade) || quantidade < 100) {
    return NextResponse.json({error: "Quantidade mínima é de 100 ações."}, {status: 400});
  }

  if (!body.ticker || typeof body.preco !== "number" || body.preco <= 0) {
    return NextResponse.json({error: "Ticker e preço válidos são obrigatórios."}, {status: 400});
  }

  const ordem: Ordem = {
    id: crypto.randomUUID(),
    ticker: body.ticker,
    quantidade,
    preco: body.preco,
    total: quantidade * body.preco,
    tipo: "compra",
    timestamp: new Date().toISOString(),
  };

  // Bug B12: push na array ERRADA (ACOES_MOCK em vez de ORDENS_MOCK)
  // Após 3 ordens, /api/acoes retorna ações misturadas com ordens
  ACOES_MOCK.push(ordem as any); // Bug B12: deveria ser ORDENS_MOCK.push(ordem)

  return NextResponse.json(ordem, { status: 201 });
}
