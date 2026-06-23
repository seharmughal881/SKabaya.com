"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setMessage(data.message);
        setDone(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="newsletter"
      className="grain relative overflow-hidden py-28 md:py-36"
    >
      {/* Gilded ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.6), transparent 70%)",
        }}
      />

      <Reveal className="section section-wide mx-auto max-w-2xl text-center">
        <p className="eyebrow">Become an Insider</p>
        <h2 className="mt-6 font-display text-4xl text-ivory md:text-6xl">
          Join the World of{" "}
          <span className="font-serif italic text-gilded">SK Abaya</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-serif text-lg leading-relaxed text-ivory/75 md:text-xl">
          Exclusive access to new collections, private VIP launches, and the
          stories behind every stitch.
        </p>

        {done ? (
          <p className="font-serif mt-12 text-xl italic text-gold">
            {message || "Welcome to the house. Your invitation is on its way."}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="font-label flex-1 border border-line bg-ink/40 px-5 py-4 text-sm tracking-wide text-ivory placeholder:text-muted/70 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold whitespace-nowrap disabled:opacity-60"
            >
              {submitting ? "Joining…" : "Subscribe"}
            </button>
          </form>
        )}
        {error && (
          <p className="font-label mt-4 text-xs uppercase tracking-[0.2em] text-red-400">
            {error}
          </p>
        )}
        <p className="font-label mt-5 text-[10px] uppercase tracking-[0.25em] text-muted">
          No spam — only elegance. Unsubscribe anytime.
        </p>
      </Reveal>
    </section>
  );
}
