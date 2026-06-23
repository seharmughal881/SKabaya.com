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
      const httpStatus = result.reason === "not_found" ? 404 : 409;
      let message: string;
      if (result.reason === "not_found") {
        message = "Order not found.";
      } else if (result.reason === "window_expired") {
        message =
          "The 1-hour cancellation window has passed. Please contact us on WhatsApp to cancel.";
      } else {
        message = `This order is "${result.status}" and can no longer be cancelled. Please contact us on WhatsApp.`;
      }
      return NextResponse.json({ error: message }, { status: httpStatus });
    }
    return NextResponse.json({ ok: true, status: result.status });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
