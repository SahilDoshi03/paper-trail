"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { createEditor, Descendant } from "slate";
import {
  Slate,
  Editable,
  RenderElementProps,
  withReact,
  RenderLeafProps,
} from "slate-react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import SecondaryHeader from "@/app/components/SecondaryHeader/SecondaryHeader";
import { CustomEditor } from "@/app/utils/CustomEditor";
import type { CustomElement, CustomText } from "@/app/types/Editor";
import type { DocumentType } from "@/app/types/Document";
import { updateDocument } from "@/app/actions/Document";
import debounce from "lodash.debounce";

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
  docValue: DocumentType;
};

const EditorComponent = ({ docId, docValue }: EditorComponentProps) => {
  const [editor] = useState(() => withReact(createEditor()));
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
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

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
    </Slate>
  );
};

export default EditorComponent;
