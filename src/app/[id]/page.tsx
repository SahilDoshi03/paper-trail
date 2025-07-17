'use client';

import EditorComponent from "@/app/components/EditorComponent/EditorComponent";
import { getDocument, updateDocument } from "@/app/actions/Document";
import { DocumentType } from "@/app/lib/schemas/Document";
import { notFound, useParams } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { signIn, useSession } from "next-auth/react";

export default function Document() {
  const { data: sessionData } = useSession()
  console.log(sessionData)
  const params = useParams()
  const [docValue, setDocValue] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const docId = params.id as string;

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      const fetchedDoc = await getDocument(docId);
      if (!fetchedDoc) {
        notFound();
      }
      setDocValue(fetchedDoc);
      setCurrentTitle(fetchedDoc.title);
      setLoading(false);
    };
    fetchDocument();
  }, [docId]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleTitleBlur = async () => {
    setIsEditing(false);
    if (docValue && currentTitle !== docValue.title) {
      await updateDocument(docId, { title: currentTitle });
      setDocValue({ ...docValue, title: currentTitle });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  if (loading) {
    return <div className="p-10">Loading document...</div>;
  }

  return (
    <div className="p-10">
      <div className="flex justify-between">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={currentTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            className="text-[2rem] mb-4 outline-none border-b border-gray-300 focus:border-blue-500"
          />
        ) : (
          <h2 className="text-[2rem] mb-4 cursor-pointer" onClick={handleTitleClick}>
            {currentTitle}
          </h2>
        )}
        <form
          action={async () => {
            await signIn("google")
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      </div>
      {docValue && (
        <div className="flex flex-col gap-10 items-center justify-center">
          <EditorComponent docId={docId} docValue={docValue} />
        </div>
      )}
    </div>
  );
}

