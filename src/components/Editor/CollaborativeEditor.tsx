import { useState, useEffect } from "react";
import {
  useRoom,
} from "@liveblocks/react/suspense";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import * as Y from 'yjs'
import EditorComponent from "./EditorComponent";
import { EditorDocument } from "@/lib/schemas/Document";

type CollaborativeComponentProps = {
  docId: string;
  docValue: EditorDocument;
};

export function CollaborativeEditor({ docId, docValue }: CollaborativeComponentProps) {
  const room = useRoom();
  const [connected, setConnected] = useState(false);

  const yProvider = getYjsProviderForRoom(room);
  const yDoc = yProvider.getYDoc();
  const sharedType = yDoc.get("slate", Y.XmlText) as Y.XmlText;

  useEffect(() => {
    yProvider.on("sync", setConnected);

    return () => {
      yProvider?.off("sync", setConnected);
    };
  }, [room]);

  if (!connected || !sharedType) {
    return <div>Loading...</div>
  }

  return (
    <EditorComponent docId={docId} docValue={docValue} yProvider={yProvider} sharedType={sharedType} />
  )
}

