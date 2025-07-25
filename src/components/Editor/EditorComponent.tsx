"use client";

import React, { useCallback, useRef, useEffect, useMemo } from "react";
import { Editor, BaseEditor, createEditor, Descendant, Transforms } from "slate";
import {
  Slate,
  Editable,
  RenderElementProps,
  withReact,
  RenderLeafProps,
} from "slate-react";
import { ReactEditor } from "slate-react";
import SecondaryHeader from "@/components/SecondaryHeader/SecondaryHeader";
import { CustomEditor } from "@/lib/CustomEditor";
import type { CustomElement, CustomText } from "@/lib/schemas/Document";
import type { EditorDocument } from "@/lib/schemas/Document";
import { updateDocument } from "@/actions/Document";
import debounce from "lodash.debounce";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import * as Y from 'yjs'
import { withCursors, withYjs, YjsEditor } from "@slate-yjs/core";
import { useSession } from "next-auth/react";
import Cursors from "./Cursor";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  const { textAlign, lineHeight, paraSpaceBefore, paraSpaceAfter, fontFamily } =
    props.element;

  const style: React.CSSProperties = {
    textAlign,
    lineHeight,
    marginTop: paraSpaceBefore,
    marginBottom: paraSpaceAfter,
    fontFamily,
  };

  return (
    <p {...props.attributes} style={style}>
      {props.children}
    </p>
  );
};

const Leaf = (props: RenderLeafProps) => {
  const { bold, underline, italic, color, backgroundColor, fontSize } =
    props.leaf;

  const style: React.CSSProperties = {
    color,
    fontSize: `${fontSize}px`,
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    backgroundColor: backgroundColor,
  };

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

type EditorComponentProps = {
  docId: string;
  docValue: EditorDocument;
  sharedType: Y.XmlText;
  yProvider: LiveblocksYjsProvider;
};

const EditorComponent = ({ docId, docValue, sharedType, yProvider }: EditorComponentProps) => {
  const session = useSession()
  const initialValue: Descendant[] =
    docValue.elements && docValue.elements.length > 0
      ? docValue.elements
      : [
        {
          type: "paragraph",
          textAlign: "left",
          fontFamily: "Arial",
          paraSpaceAfter: 0,
          paraSpaceBefore: 0,
          lineHeight: 1.2,
          children: [
            {
              text: "",
              textAlign: "left",
              color: "#ffffff",
              fontSize: 16,
              bold: false,
              italic: false,
              underline: false,
              backgroundColor: "transparent",
            },
          ],
        },
      ];

  const editor = useMemo(() => {
    const e = withReact(
      withCursors(
        withYjs(createEditor(), sharedType),
        yProvider.awareness as any,
        {
          data: {
            name: session?.data?.user?.name || "sahil",
            color: "#215915",
          }
        }
      ));

    const { normalizeNode } = e;
    e.normalizeNode = (entry) => {
      const [node] = entry;

      if (!Editor.isEditor(node) || node.children.length > 0) {
        return normalizeNode(entry);
      }

      Transforms.insertNodes(editor, initialValue, { at: [0] });
    };

    return e;
  }, []);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const saveDocument = async (elements: Descendant[]) => {
    await updateDocument(docId, { elements });
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const debouncedSave = useCallback(
    debounce((value: Descendant[]) => {
      saveDocument(value);
    }, 1000),
    [docId],
  );

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  useEffect(() => {
    if (editorRef.current) {
      ReactEditor.focus(editor);
    }
  }, [editor]);



  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={async (value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== "set_selection",
        );

        if (isAstChange) {
          debouncedSave(value);
        }
      }}
    >
      <SecondaryHeader />
      <Cursors>
        <Editable
          className="h-[1123px] w-[794px] border-1 border-[#666666] focus-within:outline-none"
          ref={editorRef}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onBlur={(e) => {
            const related = e.relatedTarget;
            if (related?.tagName !== "INPUT") {
              editorRef.current?.focus();
            }
          }}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case "s": {
                event.preventDefault();
                saveDocument(editor.children);
                break;
              }

              case "~": {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }

              case "b": {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }

              case "i": {
                event.preventDefault();
                CustomEditor.toggleItalicMark(editor);
                break;
              }

              case "u": {
                event.preventDefault();
                CustomEditor.toggleUnderlineMark(editor);
                break;
              }
            }
          }}
        />
      </Cursors>
    </Slate>
  );
};

export default EditorComponent;
