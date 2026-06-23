"use client";

import { useState } from "react";

export default function ImageField({
  className = "",
}: {
  className?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [url, setUrl] = useState("");

  return (
    <div className={`block ${className}`}>
      <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
        Image *
      </span>

      <div className="mt-2 flex items-start gap-4">
        {/* Preview */}
        <div className="relative h-24 w-20 shrink-0 overflow-hidden border border-line/60 bg-charcoal">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-label grid h-full place-items-center px-2 text-center text-[8px] uppercase tracking-[0.2em] text-muted">
              No image
            </span>
          )}
        </div>

        <div className="flex-1 space-y-3">
          {/* File upload */}
          <label className="font-label flex cursor-pointer items-center justify-center border border-dashed border-gold/40 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10">
            Upload from device
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setPreview(URL.createObjectURL(f));
                  setUrl("");
                }
              }}
            />
          </label>

          {/* URL fallback */}
          <input
            name="image"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setPreview(e.target.value || null);
            }}
            className="input"
            placeholder="…or paste an image URL"
          />
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted">
        JPG / PNG / WebP, up to 5&nbsp;MB. Uploaded images are saved to your store.
      </p>
    </div>
  );
}
