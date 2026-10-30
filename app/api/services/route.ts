import { NextResponse } from "next/server";
import { getServices, getServiceCategories } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [services, categories] = await Promise.all([
      getServices(),
      getServiceCategories(),
    ]);

    return NextResponse.json({
      services,
      categories,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

