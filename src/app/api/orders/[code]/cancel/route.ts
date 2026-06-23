import { NextResponse } from "next/server";
import { cancelOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  ctx: RouteContext<"/api/orders/[code]/cancel">,
) {
  const { code } = await ctx.params;
  try {
    const result = await cancelOrder(code);
    if (!result.ok) {
      const status = result.reason === "not_found" ? 404 : 409;
      const message =
        result.reason === "not_found"
          ? "Order not found."
          : `This order is "${result.status}" and can no longer be cancelled. Please contact us on WhatsApp.`;
      return NextResponse.json({ error: message }, { status });
    }
    return NextResponse.json({ ok: true, status: result.status });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
