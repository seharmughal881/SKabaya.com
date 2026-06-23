"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelOrderButton({ code }: { code: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function doCancel() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${code}/cancel`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not cancel. Please try again.");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setBusy(false);
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="btn-ghost w-full sm:w-auto"
      >
        Cancel Order
      </button>
    );
  }

  return (
    <div className="glass w-full p-5">
      <p className="font-serif text-lg text-ivory">
        Cancel this order? This cannot be undone.
      </p>
      {error && (
        <p className="font-label mt-3 text-xs uppercase tracking-[0.2em] text-red-400">
          {error}
        </p>
      )}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={doCancel}
          disabled={busy}
          className="btn-gold disabled:opacity-60"
        >
          {busy ? "Cancelling…" : "Yes, cancel order"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={busy}
          className="btn-ghost"
        >
          Keep order
        </button>
      </div>
    </div>
  );
}
