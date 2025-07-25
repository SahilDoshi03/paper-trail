'use server'

import { EditorDocument } from "@/app/lib/schemas/Document";

export async function getDocument(docId: string): Promise<EditorDocument | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/documents/${docId}?userId=${1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export async function updateDocument(
  docId: string,
  docValue: Partial<EditorDocument>,
): Promise<EditorDocument | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/documents/${docId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(docValue),
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

export async function getDocuments(): Promise<EditorDocument[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    const res = await fetch(`${baseUrl}/api/documents`, {
      headers: {
        'x-user-id': '1'
      }
    });

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

export async function createDocument(): Promise<EditorDocument | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function deleteDocument(docId: string): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/documents/${docId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error(`Failed to delete document: ${res.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to delete document", error);
    return false;
  }
}
