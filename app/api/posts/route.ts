import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json({ posts });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

