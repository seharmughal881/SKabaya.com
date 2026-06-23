import { NextResponse } from "next/server";
import { getOrderByCode } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/orders/[code]">,
) {
  const { code } = await ctx.params;
  try {
    const order = await getOrderByCode(code);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
