"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function formatLeft(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CancelOrderButton({
  code,
  deadline,
}: {
  code: string;
  /** Epoch ms after which cancellation is no longer allowed. */
  deadline: number;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // Remaining ms; null until mounted so server/client render match.
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(deadline - Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [deadline]);

  const expired = remaining !== null && remaining <= 0;

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

  if (expired) {
    return (
      <p className="font-label text-[11px] uppercase tracking-[0.2em] text-muted">
        Cancellation window has closed.
      </p>
    );
  }

  if (!confirming) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setConfirming(true)}
          className="btn-ghost w-full sm:w-auto"
        >
          Cancel Order
        </button>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-muted">
          {remaining === null
            ? "You can cancel within 1 hour of ordering"
            : `You can cancel for ${formatLeft(remaining)} more`}
        </span>
      </div>
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
