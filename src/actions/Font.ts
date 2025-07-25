import { WebFont } from "@/app/types/Font";

export async function getGoogleFonts(sort: string, query: string): Promise<WebFont[]> {
  try {
    const params = new URLSearchParams({ sort, q: query });
    const res = await fetch(`http://localhost:3000/api/fonts?${params.toString()}`);
    if (!res.ok) {
      console.error(`Failed to fetch fonts: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Failed to load fonts:", error);
    return [];
  }
}
