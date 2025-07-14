'use server'

import { Document } from "./types/Document";
import { Descendant } from "slate";
import { WebFont } from "./types/Font";

export async function getDocument(docId: string): Promise<Document | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/documents/${docId}`);
    if (!res.ok) {
      console.error(`Failed to fetch document: ${res.statusText}`);
      return null;
    }
    const { document } = await res.json();
    return document;
  } catch (error) {
    console.error("Failed to load document:", error);
    return null;
  }
}

export async function updateDocument(docId: string, elements: Descendant[]): Promise<Document | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/documents/${docId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ elements }),
    });

    if (!res.ok) {
      console.error(`Failed to update document: ${res.statusText}`);
      return null;
    }

    const updated = await res.json();
    console.log("Document saved", updated);
    return updated;
  } catch (error) {
    console.error("Failed to save document", error);
    return null;
  }
}

export async function getDocuments(): Promise<Document[]> {
  try {
    const res = await fetch("http://localhost:3001/api/documents");
    if (!res.ok) {
      console.error(`Failed to fetch documents: ${res.statusText}`);
      return [];
    }
    const { documents } = await res.json();
    return documents;
  } catch (error) {
    console.error("Failed to load documents:", error);
    return [];
  }
}

export async function createDocument(title: string): Promise<Document | null> {
  try {
    const res = await fetch("http://localhost:3001/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    if (!res.ok) {
      console.error(`Failed to create document: ${res.statusText}`);
      return null;
    }

    const { document } = await res.json();
    return document;
  } catch (error) {
    console.error("Failed to create document", error);
    return null;
  }
}

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
