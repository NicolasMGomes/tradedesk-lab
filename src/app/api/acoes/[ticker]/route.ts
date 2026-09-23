import { NextResponse } from "next/server";
import { ACOES_MOCK } from "@/lib/mocks";
import { normalizeAcao } from "@/lib/brapi";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;

  try {
    const res = await fetch(`https://brapi.dev/api/quote/${ticker}?fundamental=false`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("brapi offline");
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ error: `Ticker "${ticker}" não encontrado.` }, { status: 404 });
    }
    return NextResponse.json(normalizeAcao(data.results[0]));
  } catch {
    const acao = ACOES_MOCK.find(a => a.ticker === ticker.toUpperCase());
    if (!acao) {
      return NextResponse.json({ error: `Ticker "${ticker}" não encontrado.` }, { status: 404 });
    }
    return NextResponse.json(acao);
  }
}
