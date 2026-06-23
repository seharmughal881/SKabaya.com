import { NextResponse } from "next/server";
import { subscribe } from "@/lib/queries";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 422 },
    );
  }

  try {
    const created = await subscribe(email.trim());
    return NextResponse.json(
      {
        ok: true,
        created,
        message: created
          ? "Welcome to the world of SK Abaya."
          : "You are already on our list.",
      },
      { status: created ? 201 : 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
