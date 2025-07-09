import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  const res = await fetch("http://localhost:3001/api/documents");
  const docs = await res.json();
  return NextResponse.json(docs);
};

export const POST = async (req: NextRequest) => {
  const doc = await req.json();

  const res = await fetch("http://localhost:3001/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doc),
  });

  const created = await res.json();
  return NextResponse.json(created);
};

