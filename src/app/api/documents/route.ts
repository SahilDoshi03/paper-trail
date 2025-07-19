import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch("http://localhost:3001/api/documents");
  const docs = await res.json();
  return NextResponse.json(docs);
};

export const POST = async () => {

  const res = await fetch("http://localhost:3001/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const created = await res.json();
  return NextResponse.json(created);
};

