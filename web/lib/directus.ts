/**
 * Client Directus minimal (fetch natif) — sans dépendance SDK pour le MVP.
 *
 * En v0.4, on pourra basculer sur @directus/sdk pour plus de confort
 * (typage des collections, subscriptions websocket, etc.).
 *
 * Usage :
 *   import { directus } from "@/lib/directus";
 *   const metiers = await directus<Metier[]>("/items/metier?status=published&limit=20");
 */

const BASE = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055";
const STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

interface DirectusError {
  message: string;
  extensions?: { code: string };
}

interface DirectusResponse<T> {
  data: T;
  errors?: DirectusError[];
}

/**
 * Appel GET Directus avec revalidation ISR (60s par défaut).
 * Les appels sont cached côté Next.js grâce à fetch() natif.
 */
export async function directus<T>(
  path: string,
  opts: { revalidate?: number; cache?: RequestCache } = {}
): Promise<T> {
  const { revalidate = 60, cache = "force-cache" } = opts;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (STATIC_TOKEN) {
    headers.Authorization = `Bearer ${STATIC_TOKEN}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    headers,
    cache,
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Directus ${res.status} on ${path}: ${res.statusText}`);
  }

  const json: DirectusResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(`Directus error: ${json.errors.map((e) => e.message).join(", ")}`);
  }

  return json.data;
}

/**
 * Helper pour construire une URL de fichier Directus.
 * ex: getFileUrl("uuid-abc123", { width: 800, format: "webp" })
 */
export function getFileUrl(
  fileId: string,
  params?: { width?: number; height?: number; quality?: number; format?: "webp" | "avif" | "jpg" }
): string {
  const url = new URL(`${BASE}/assets/${fileId}`);
  if (params?.width) url.searchParams.set("width", String(params.width));
  if (params?.height) url.searchParams.set("height", String(params.height));
  if (params?.quality) url.searchParams.set("quality", String(params.quality));
  if (params?.format) url.searchParams.set("format", params.format);
  return url.toString();
}
