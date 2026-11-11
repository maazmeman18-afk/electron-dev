import { cacheLife } from "next/cache";

// Cached so the footer can prerender under cacheComponents without
// reading the current time on every request.
export async function getYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
