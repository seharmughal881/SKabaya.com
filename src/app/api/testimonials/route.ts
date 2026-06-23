import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json({ testimonials });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
