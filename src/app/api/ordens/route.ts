import { NextResponse } from "next/server";
import { ORDENS_MOCK } from "@/lib/mocks";
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

  ORDENS_MOCK.push(ordem);

  return NextResponse.json(ordem, { status: 201 });
}
