'use client';

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { CollaborativeEditor } from "@/components/Editor/CollaborativeEditor";
import { getDocument, updateDocument } from "@/actions/Document";
import type { EditorDocument } from "@/lib/schemas/Document";
import { notFound, useParams } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Document() {
  const { data: sessionData } = useSession()
  const router = useRouter()
  const params = useParams()
  const [docValue, setDocValue] = useState<EditorDocument | null>(null);
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
            router.push("/")
            await signOut()

          }}
          className="cursor-pointer"
        >
          <button
            className="cursor-pointer"
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </div>
      {docValue && (
        <div className="flex flex-col gap-10 items-center justify-center">
          <LiveblocksProvider publicApiKey={"pk_dev_DYJpqEUIQdx448Q6y9zG3qY0SS1JGCfOqJA4yWsdtmesllY3mHU4JavReJKvq-Ou"}>
            <RoomProvider id="my-room">
              <ClientSideSuspense fallback={<div>Loading...</div>}>
                <CollaborativeEditor docId={docId} docValue={docValue} />
              </ClientSideSuspense>
            </RoomProvider>
          </LiveblocksProvider>
        </div>
      )}
    </div>
  );
}

