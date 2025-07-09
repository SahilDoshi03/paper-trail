import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/app/lib/redis";
import Fuse from "fuse.js"; 

export async function GET(req: NextRequest) {
  const key = process.env.GOOGLE_API_KEY;
  const url = new URL(req.url);
  const sort = url.searchParams.get("sort") || "alpha";
  const query = url.searchParams.get("q")?.toLowerCase() || "";

  const redis = await getRedisClient();
  const cacheKey = `google_fonts:${sort}`;

  let data;
  const cached = await redis.get(cacheKey);

  if (cached) {
    data = JSON.parse(cached);
  } else {
    const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${key}&sort=${sort}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch fonts" }, { status: res.status });
    }
    data = await res.json();
    await redis.set(cacheKey, JSON.stringify(data), { EX: 86400 }); 
  }

  let filtered = data.items;

  if (query) {
    const fuse = new Fuse(filtered, {
      keys: ['family'],
      threshold: 0.3, 
    });
    filtered = fuse.search(query).map((r) => r.item);
  }

  return NextResponse.json({ items: filtered });
}

