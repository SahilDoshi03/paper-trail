"use client";

import React, { useEffect, useState } from "react";
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
import type { CustomElement, CustomText } from "@/app/types/EditorTypes";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: RenderLeafProps) => {
  const { bold, underline, italic, color, background } = props.leaf;
  const style: React.CSSProperties = {
    color: color ? color : "#ffffff",
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    backgroundColor: background ? background: "none"
  };
  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const renderLeaf = (props: RenderLeafProps) => {
  return <Leaf {...props} />;
};


const EditorComponent = ({ ref }: any) => {
  const [editor] = useState(() => withReact(createEditor()));

  useEffect(() => {
    ReactEditor.focus(editor)
  },[])

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <SecondaryHeader/>
      <Editable
        className="h-[1123px] w-[794px] bg-[#222222] focus-within:outline-none"
        ref={ref}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onBlur={e => e.target.focus()}
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
