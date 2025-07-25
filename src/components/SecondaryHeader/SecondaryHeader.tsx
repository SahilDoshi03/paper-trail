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
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignCenter,
  MdOutlineFormatAlignRight,
  MdOutlineFormatAlignJustify,
  MdFormatClear,
} from "react-icons/md";
import { GoPlus, GoDash } from "react-icons/go";
import Popover from "@/components/common/Popover";
import { CustomEditor } from "@/lib/CustomEditor";
import { useSlate } from "slate-react";
import AlignPopover from "./AlignPopover";
import LineSpacingPopoverMenu from "./LineSpacingPopoverMenu";
import FontsPopover from "./FontsPopover";

const alignmentIcons = {
  "left": MdOutlineFormatAlignLeft,
  "center": MdOutlineFormatAlignCenter,
  "right": MdOutlineFormatAlignRight,
  "justify": MdOutlineFormatAlignJustify,
};

const SecondaryHearder = () => {
  const editor = useSlate();
  const currentAlign = CustomEditor.getTextAlign(editor);
  const CurrentAlignIcon = alignmentIcons[currentAlign]

  return (
    <div className="w-full h-10 flex justify-between items-center p-5 rounded-full bg-[#222222]">
      <div className="flex items-center">
        <section className="flex items-center gap-2 px-2 border-r-1">
          <MdOutlinePrint size={20} />
          <div>Zoom</div>
        </section>

        <section className="flex items-center gap-2 px-2 border-r-1">
          <div>Dropdown styles</div>
        </section>

        <section className="flex items-center gap-2 px-2 border-r-1">
          <Popover
            trigger={
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="icon-btn"
                type="button"
              >
                {CustomEditor.getFontFamily(editor)}
              </button>
            }
          >
            <FontsPopover />
          </Popover>
        </section>

        <section className="flex items-center gap-1 px-2 border-r-1">
          <GoPlus
            size={20}
            className="icon-btn"
            onClick={() => {
              const newSize = Math.min(
                400,
                CustomEditor.getFontSize(editor) + 1,
              );
              CustomEditor.setFontSize(editor, newSize);
            }}
          />
          <input
            className="max-w-[30px] text-center border-1 p-1 focus:border-1 focus:outline-none rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={CustomEditor.getFontSize(editor)}
            onChange={(e) => {
              let value = parseInt(e.target.value, 10);
              if (value < 1) {
                value = 1;
              }
              if (value > 400) {
                value = 400;
              }
              CustomEditor.setFontSize(editor, value);
            }}
          />
          <GoDash
            size={20}
            className="icon-btn"
            onClick={() => {
              const newSize = Math.max(1, CustomEditor.getFontSize(editor) - 1);
              CustomEditor.setFontSize(editor, newSize);
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
            <MdFormatColorText
              size={20}
              color={CustomEditor.getTextColor(editor)}
            />
            <input
              type="color"
              value={CustomEditor.getTextColor(editor)}
              onChange={(e) => {
                const color = e.target.value;
                CustomEditor.setTextColor(editor, color);
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              title="Text color"
            />
          </button>
          <button className="icon-btn relative p-1">
            <MdBrush 
              style={{ borderColor: CustomEditor.getHighlightColor(editor) }}
              className="border-b-3" size={20} />
            <input
              type="color"
              value={CustomEditor.getHighlightColor(editor)}
              onChange={(e) => {
                const color = e.target.value;
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
                <CurrentAlignIcon size={20} />
              </button>
            }
          >
            <AlignPopover />
          </Popover>
          <Popover
            trigger={
              <button className="icon-btn">
                <MdFormatLineSpacing size={20} />
              </button>
            }
          >
            <LineSpacingPopoverMenu />
          </Popover>

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
