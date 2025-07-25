import {
  MdOutlineFormatAlignJustify,
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignRight,
  MdOutlineFormatAlignCenter,
} from "react-icons/md";
import { useState, useEffect } from "react";
import { CustomEditor } from "@/lib/CustomEditor";
import { useSlate } from "slate-react";
import { TextAlign } from "@/lib/schemas/Document";
import { IconType } from "react-icons";
import { Editor, Element } from "slate";

type AlignmentOptions = {
  value: TextAlign;
  icon: IconType;
};

const AlignPopover = () => {
  const editor = useSlate();
  const [selected, setSelected] = useState(CustomEditor.getTextAlign(editor));

  const alignments: AlignmentOptions[] = [
    { value: "left", icon: MdOutlineFormatAlignLeft },
    { value: "center", icon: MdOutlineFormatAlignCenter },
    { value: "right", icon: MdOutlineFormatAlignRight },
    { value: "justify", icon: MdOutlineFormatAlignJustify },
  ];

  useEffect(() => {
    if (!editor.selection) return;

    const [match] = Editor.nodes(editor, {
      match: (n) =>
        Element.isElement(n) && Editor.isBlock(editor, n) && "textAlign" in n,
    });

    if (match) {
      const [node] = match;
      if (
        Element.isElement(node) &&
        "textAlign" in node &&
        typeof node.textAlign === "string"
      ) {
        setSelected(node.textAlign);
      }
    }
  }, [editor, editor.selection]);

  return (
    <div className="flex gap-1 p-1">
      {alignments.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => {
            CustomEditor.setTextAlign(editor, value);
            setSelected(value);
          }}
          className={`icon-btn p-1 rounded transition-colors ${selected === value ? "bg-[#000000] text-white" : "hover:bg-gray-200"
            }`}
        >
          <Icon size={25} />
        </button>
      ))}
    </div>
  );
};

export default AlignPopover;
