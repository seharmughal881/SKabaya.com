"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  checkPassword,
  sessionToken,
  requireAdmin,
} from "@/lib/auth";
import {
  createProduct,
  deleteProduct,
  toggleBestSeller,
  createCollection,
  deleteCollection,
  createTestimonial,
  deleteTestimonial,
  updateOrderStatus,
} from "@/lib/admin";
import type { OrderStatus } from "@/lib/orders";
import { saveUpload } from "@/lib/upload";

/* ---- Auth ---- */

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const store = await cookies();
  store.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* ---- helpers ---- */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Prefers an uploaded file; falls back to a pasted image URL. */
async function resolveImage(formData: FormData): Promise<string> {
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    const saved = await saveUpload(file);
    if (saved) return saved;
  }
  return String(formData.get("image") ?? "").trim();
}

/* ---- Products ---- */

export async function addProduct(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const image = await resolveImage(formData);
  if (!name || !image) return;

  const providedId = String(formData.get("id") ?? "").trim();
  await createProduct({
    id: providedId ? slugify(providedId) : slugify(name),
    name,
    collection: String(formData.get("collection") ?? "Signature").trim(),
    price: Number(formData.get("price") ?? 0),
    currency: String(formData.get("currency") ?? "USD").trim(),
    rating: Math.min(5, Math.max(0, Number(formData.get("rating") ?? 5))),
    reviews: Number(formData.get("reviews") ?? 0),
    badge: String(formData.get("badge") ?? "").trim() || undefined,
    image,
    isBestSeller: formData.get("isBestSeller") === "on",
  });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function removeProduct(formData: FormData) {
  await requireAdmin();
  await deleteProduct(String(formData.get("id")));
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function setBestSeller(formData: FormData) {
  await requireAdmin();
  await toggleBestSeller(
    String(formData.get("id")),
    formData.get("value") === "true",
  );
  revalidatePath("/admin/products");
  revalidatePath("/");
}

/* ---- Collections ---- */

export async function addCollection(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const image = await resolveImage(formData);
  if (!name || !image) return;
  await createCollection({
    slug: slugify(String(formData.get("slug") ?? "") || name),
    name,
    tagline: String(formData.get("tagline") ?? "").trim(),
    image,
  });
  revalidatePath("/admin/collections");
  revalidatePath("/");
}

export async function removeCollection(formData: FormData) {
  await requireAdmin();
  await deleteCollection(String(formData.get("slug")));
  revalidatePath("/admin/collections");
  revalidatePath("/");
}

/* ---- Testimonials ---- */

export async function addTestimonial(formData: FormData) {
  await requireAdmin();
  const quote = String(formData.get("quote") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  if (!quote || !name) return;
  await createTestimonial({
    quote,
    name,
    location: String(formData.get("location") ?? "").trim(),
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function removeTestimonial(formData: FormData) {
  await requireAdmin();
  await deleteTestimonial(Number(formData.get("id")));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

/* ---- Orders ---- */

const VALID_STATUS: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export async function changeOrderStatus(formData: FormData) {
  await requireAdmin();
  const code = String(formData.get("code"));
  const status = String(formData.get("status")) as OrderStatus;
  if (VALID_STATUS.includes(status)) {
    await updateOrderStatus(code, status);
  }
  revalidatePath("/admin");
  revalidatePath(`/order/${code}`);
}
