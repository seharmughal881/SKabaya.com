"use client";

import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello SK Abaya, I'd like to enquire about your luxury abayas.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3"
    >
      <span className="font-label hidden rounded-full bg-ink/80 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ivory backdrop-blur transition-opacity group-hover:opacity-100 sm:block sm:opacity-0">
        Order on WhatsApp
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white">
          <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.3.1.4.1.6-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.4z" />
        </svg>
      </span>
    </a>
  );
}
