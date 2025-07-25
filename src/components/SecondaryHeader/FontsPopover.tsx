"use client";

import { useState } from "react";
import Modal from "../common/Modal";
import CustomFontSelector from "./CustomFontSelector";
import { CustomEditor } from "@/lib/CustomEditor";
import { useSlate } from "slate-react";
import { loadGoogleFont } from "@/utils/FontFamily";

const FontsPopover = () => {
  const editor = useSlate();
  const fonts = ["Arial", "Times New Roman"];
  const [customModalOpen, setCustomModalOpen] = useState(false);

  return (
    <>
      <ul className="flex flex-col w-max">
        <li
          className="border-b p-2 hover:bg-[#222222] cursor-pointer"
          onClick={() => setCustomModalOpen(true)}
        >
          Custom
        </li>
        {fonts.map((font) => (
          <li
            key={font}
            className={`p-2 hover:bg-[#222222] cursor-pointer ${CustomEditor.getFontFamily(editor) === font ? "bg-[#222222]" : ""}`}
            style={{ fontFamily: font }}
            onClick={() => {
              loadGoogleFont(font);
              CustomEditor.setFontFamily(editor, font);
            }}
          >
            {font}
          </li>
        ))}
      </ul>
      {customModalOpen && (
        <Modal
          title={"Fonts"}
          open={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
        >
          <CustomFontSelector/>
        </Modal>
      )}
    </>
  );
};

export default FontsPopover;
