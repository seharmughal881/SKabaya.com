import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query<{ now: string }>("SELECT now() AS now");
    return NextResponse.json({ status: "ok", db: "up", time: rows[0].now });
  } catch (err) {
    return NextResponse.json(
      { status: "error", db: "down", message: (err as Error).message },
      { status: 503 },
    );
  }
}
