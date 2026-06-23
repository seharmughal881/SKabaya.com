"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TrackOrderPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed) router.push(`/order/${encodeURIComponent(trimmed)}`);
  }

  return (
    <>
      <Header />
      <main className="section section-wide flex-1 py-20 md:py-28">
        <div className="mx-auto max-w-md text-center">
          <p className="eyebrow">Track &amp; Manage</p>
          <h1 className="mt-4 font-display text-4xl text-ivory md:text-5xl">
            Track your <span className="font-serif italic text-gilded">order</span>
          </h1>
          <p className="mt-5 text-muted">
            Enter your order reference (e.g. SKA-7F3A9C) to view its status or
            cancel it.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="SKA-XXXXXX"
              className="input text-center tracking-[0.3em] uppercase"
              autoFocus
            />
            <button type="submit" className="btn-gold w-full">
              Find Order
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
