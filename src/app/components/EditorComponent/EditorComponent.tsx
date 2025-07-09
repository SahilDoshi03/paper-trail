"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createEditor } from "slate";
import {
  Slate,
  Editable,
  RenderElementProps,
  withReact,
  RenderLeafProps,
} from "slate-react";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import SecondaryHeader from "@/app/components/SecondaryHeader/SecondaryHeader";
import { CustomEditor } from "@/app/utils/CustomEditor";
import type { CustomElement, CustomText } from "@/app/types/Editor";

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
    fontWeight: bold ? "bold" : "unset",
    fontStyle: italic ? "italic" : "unset",
    textDecoration: underline ? "underline" : "unset",
    backgroundColor: backgroundColor,
  };

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

const EditorComponent = () => {
  const [docValue, setDocValue] = useState<Descendant[]>([
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
          backgroundColor: "unset",
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [editor] = useState(() => withReact(createEditor()));
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getDocs = async () => {
      try {
        const res = await fetch("/api/documents/2");
        const { document } = await res.json();
        console.log("DOC", document);
        if (document?.elements) {
          setDocValue(document.elements);
        }
      } catch (error) {
        console.error("Failed to load or create document:", error);
      } finally {
        setLoading(false);
      }
    };

    getDocs();
  }, []);

  useEffect(() => {
    if (!loading && editorRef.current) {
      ReactEditor.focus(editor);
    }
  }, [editor, loading]);

  const saveDocument = async () => {
    try {
      const res = await fetch("/api/documents/2", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ elements: docValue }),
      });

      const updated = await res.json();
      console.log("Document saved", updated);
    } catch (error) {
      console.error("Failed to save document", error);
    }
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

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Slate
      editor={editor}
      initialValue={docValue}
      onChange={async (value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== "set_selection",
        );

        if (isAstChange) {
          setDocValue(value);
        }
      }}
    >
      <SecondaryHeader />
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
              saveDocument(); // manual save
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
    </Slate>
  );
};

export default EditorComponent;
