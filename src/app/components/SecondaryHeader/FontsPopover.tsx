"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../common/Modal";
import CustomFontSelector from "./CustomFontSelector";
import { CustomEditor } from "@/app/utils/CustomEditor";
import { useSlate } from "slate-react";
import { loadGoogleFont } from "@/app/utils/FontFamily";

const FontsPopover = ({
  setFontFamily,
}: {
  setFontFamily: Dispatch<SetStateAction<string>>;
}) => {
  const editor = useSlate();
  const [fonts, setFonts] = useState(["Arial", "Times New Roman"]);
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
            className="p-2 hover:bg-[#222222] cursor-pointer"
            style={{ fontFamily: font }}
            onClick={() => {
              setFontFamily(font);
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
          children={
            <CustomFontSelector
              setFonts={setFonts}
              setFontFamily={setFontFamily}
            />
          }
        />
      )}
    </>
  );
};

export default FontsPopover;
