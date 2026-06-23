import { readFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { UPLOAD_DIR } from "@/lib/upload";

export const dynamic = "force-dynamic";

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export async function GET(_req: Request, ctx: RouteContext<"/media/[name]">) {
  const { name } = await ctx.params;
  // Strip any path components to prevent directory traversal.
  const safe = basename(name);

  try {
    const buf = await readFile(join(UPLOAD_DIR, safe));
    const type = CONTENT_TYPES[extname(safe).toLowerCase()] ?? "application/octet-stream";
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
