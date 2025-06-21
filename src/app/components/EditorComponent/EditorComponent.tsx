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
  const { textAlign, lineHeight, paraSpaceBefore, paraSpaceAfter } = props.element;

  const style: React.CSSProperties = {
    textAlign: textAlign,
    lineHeight: lineHeight,
    marginTop: paraSpaceBefore,
    marginBottom: paraSpaceAfter
  };

  return (
    <p {...props.attributes} style={style}>
      {props.children}
    </p>
  );
};

const Leaf = (props: RenderLeafProps) => {
  const {
    bold,
    underline,
    italic,
    color,
    backgroundColor,
    fontSize,
  } = props.leaf;

  const style: React.CSSProperties = {
    color,
    fontSize,
    fontWeight: bold ? "bold" : "unset",
    fontStyle: italic ? "italic" : "italic",
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
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#ffffff");
  const [highlightColor, setHighlightColor] = useState("unset");
  const [editor] = useState(() => withReact(createEditor()));
  const editorRef = useRef<HTMLDivElement | null>(null);

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      textAlign: "left",
      fontFamily: "Arial",
      paraSpaceAfter: 0,
      paraSpaceBefore: 0,
      lineHeight: 1.2,
      children: [{
        text: "",
        textAlign: "left",
        color: textColor,
        fontSize: `${fontSize}px`,
        bold: false,
        italic: false,
        underline: false,
        backgroundColor: highlightColor,
      }],
    },
  ];
  useEffect(() => {
    ReactEditor.focus(editor);
  }, [editor]);

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

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <SecondaryHeader
        fontSize={fontSize}
        setFontSize={setFontSize}
        textColor={textColor}
        setTextColor={setTextColor}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
      />
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
