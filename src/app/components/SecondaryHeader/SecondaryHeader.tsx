"use client";

import {
  MdFormatColorText,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdOutlinePrint,
  MdBrush,
  MdAddLink,
  MdOutlineAddComment,
  MdOutlineImage,
  MdFormatIndentIncrease,
  MdFormatIndentDecrease,
  MdFormatLineSpacing,
  MdChecklist,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatClear,
} from "react-icons/md";
import { GoPlus, GoDash } from "react-icons/go";
import Dropdown from "./Dropdown";
import Popover from "./Popover";
import { CustomEditor } from "@/app/utils/CustomEditor";
import { useSlate } from "slate-react";
import { useState } from "react";

const SecondaryHearder = () => {
  const editor = useSlate();
  const [fontSize, setFontSize] = useState(15);
  const [textColor, setTextColor] = useState("#ffffff");
  const [highlightColor, setHighlightColor] = useState("");

  return (
    <div className="w-full h-10 flex justify-between items-center p-5 rounded-full bg-[#222222]">
      <div className="flex items-center">
        <section className="flex items-center gap-2 px-2 border-r-1">
          <MdOutlinePrint size={20} />
          <Dropdown />
        </section>

        <section className="flex items-center gap-2 px-2 border-r-1">
          <div>Dropdown styles</div>
        </section>

        <section className="flex items-center gap-2 px-2 border-r-1">
          <div>Font</div>
        </section>

        <section className="flex items-center px-2 border-r-1">
          <GoPlus
            size={20}
            className="icon-btn"
            onClick={() => {
              setFontSize((prev) => {
                const newSize = prev >= 400 ? 400 : prev + 1;
                CustomEditor.setFontSize(editor, `${newSize}px`);
                return newSize;
              });
            }}
          />
          <input
            className="max-w-[30px] text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={fontSize}
            onChange={(e) => {
              let value = parseInt(e.target.value, 10);
              if (value < 1) {
                value = 1;
              }
              if (value > 400) {
                value = 400;
              }
              setFontSize(value);
              CustomEditor.setFontSize(editor, `${value}px`);
            }}
          />
          <GoDash
            size={20}
            className="icon-btn"
            onClick={() => {
              setFontSize((prev) => {
                const newSize = prev <= 1 ? 1 : prev - 1;
                CustomEditor.setFontSize(editor, `${newSize}px`);
                return newSize;
              });
            }}
          />
        </section>

        <section className="flex items-center gap-2 px-2 border-r-1">
          <button
            className={`icon-btn ${CustomEditor.isBoldMarkActive(editor) ? "bg-gray-700" : ""}`}
            onClick={() => CustomEditor.toggleBoldMark(editor)}
          >
            <MdFormatBold size={20} />
          </button>
          <button
            className={`icon-btn ${CustomEditor.isItalicMarkActive(editor) ? "bg-gray-700" : ""}`}
            onClick={() => CustomEditor.toggleItalicMark(editor)}
          >
            <MdFormatItalic size={20} />
          </button>
          <button
            className={`icon-btn ${CustomEditor.isUnderlineMarkActive(editor) ? "bg-gray-700" : ""}`}
            onClick={() => CustomEditor.toggleUnderlineMark(editor)}
          >
            <MdFormatUnderlined size={20} />
          </button>
          <button className="icon-btn relative p-1">
            <MdFormatColorText size={20} color={textColor} />
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                const color = e.target.value;
                setTextColor(color);
                CustomEditor.setTextColor(editor, color);
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              title="Text color"
            />
          </button>
          <button className="icon-btn relative p-1">
            <MdBrush size={20} color={highlightColor} />
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => {
                const color = e.target.value;
                setHighlightColor(color);
                CustomEditor.setHighlightColor(editor, color);
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              title="Text color"
            />
          </button>
        </section>

        <section className="flex items-center gap-2 px-2 border-r-1">
          <button className="icon-btn">
            <MdAddLink size={20} />
          </button>
          <button className="icon-btn">
            <MdOutlineAddComment size={20} />
          </button>
          <button className="icon-btn">
            <MdOutlineImage size={20} />
          </button>
        </section>

        <section className="flex items-center gap-2 px-2">
          <Popover
            trigger={
              <button className="icon-btn">
                <MdFormatIndentDecrease size={20} />
              </button>
            }
          >
            <h5 className="text-sm font-medium mb-1">
              Text Options
            </h5>
            <p className="text-sm">Bold, italic, underline...</p>
          </Popover>
          <button className="icon-btn">
            <MdFormatLineSpacing size={20} />
          </button>
          <button className="icon-btn">
            <MdChecklist size={20} />
          </button>
          <button className="icon-btn">
            <MdFormatListBulleted size={20} />
          </button>
          <button className="icon-btn">
            <MdFormatListNumbered size={20} />
          </button>
          <button className="icon-btn">
            <MdFormatIndentIncrease size={20} />
          </button>
          <button className="icon-btn">
            <MdFormatIndentDecrease size={20} />
          </button>
          <button className="icon-btn">
            <MdFormatClear size={20} />
          </button>
        </section>
      </div>

      <div className="flex items-center gap-2">
        <section className="border-r-1 px-2">Editing Dropdown</section>
        <section>Hide Menu</section>
      </div>
    </div>
  );
};

export default SecondaryHearder;
