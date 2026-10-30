import { NextResponse } from "next/server";
import { getServiceCategories } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await getServiceCategories();
    return NextResponse.json({ categories });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

