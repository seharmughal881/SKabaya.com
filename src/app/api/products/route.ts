import { NextResponse } from "next/server";
import { getBestSellers } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getBestSellers();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
