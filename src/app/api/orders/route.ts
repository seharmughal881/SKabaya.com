import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

type Body = {
  name?: unknown;
  phone?: unknown;
  address?: unknown;
  city?: unknown;
  note?: unknown;
  items?: unknown;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, phone, address, city, note, items } = body;

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    typeof phone !== "string" ||
    phone.trim().length < 7 ||
    typeof address !== "string" ||
    address.trim().length < 4 ||
    typeof city !== "string" ||
    city.trim().length < 2
  ) {
    return NextResponse.json(
      { error: "Please provide name, phone, address and city." },
      { status: 422 },
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 422 });
  }

  const parsedItems = items
    .map((i) => ({
      productId: String((i as { productId?: unknown }).productId ?? ""),
      qty: Math.max(1, Math.floor(Number((i as { qty?: unknown }).qty ?? 1))),
    }))
    .filter((i) => i.productId);

  if (parsedItems.length === 0) {
    return NextResponse.json(
      { error: "No valid items in bag." },
      { status: 422 },
    );
  }

  try {
    const order = await createOrder({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      note: typeof note === "string" ? note.trim() : undefined,
      items: parsedItems,
    });
    return NextResponse.json({ ok: true, order }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
