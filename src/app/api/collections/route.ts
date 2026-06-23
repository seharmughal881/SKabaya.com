import { NextResponse } from "next/server";
import { getCollections } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const collections = await getCollections();
    return NextResponse.json({ collections });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
