import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  try {
    const res = await fetch(`http://localhost:3001/api/documents/${id}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Document not found" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /documents/:id failed:", error);
    return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const body = await req.json();

  const res = await fetch(`http://localhost:3001/api/documents/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const updated = await res.json();
  return NextResponse.json(updated);
};
