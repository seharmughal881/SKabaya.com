import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { randomBytes } from "node:crypto";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/** Private directory for uploads (served via the /media route, not /public). */
export const UPLOAD_DIR = join(process.cwd(), "uploads");

/**
 * Persists an uploaded image to <cwd>/uploads and returns its public URL
 * ("/media/<name>"). Files are served by the /media route handler so they
 * work in both `next dev` and `next start`. Returns null if the file is
 * missing, too large, or not an image.
 */
export async function saveUpload(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (!file.type.startsWith("image/")) return null;
  if (file.size > MAX_BYTES) return null;

  const ext =
    (file.name.split(".").pop() ?? "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 5) || "jpg";
  const name = `${Date.now().toString(36)}-${randomBytes(5).toString("hex")}.${ext}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(join(UPLOAD_DIR, name), bytes);

  return `/media/${name}`;
}
