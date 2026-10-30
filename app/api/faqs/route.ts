import { NextResponse } from "next/server";
import { getFAQs } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json({ faqs });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

