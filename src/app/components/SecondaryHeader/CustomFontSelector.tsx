"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { WebFont } from "@/app/types/Font";
import { CustomEditor } from "@/app/utils/CustomEditor";
import { useSlate } from "slate-react";
import { loadGoogleFont } from "@/app/utils/FontFamily";

const CustomFontSelector = ({
  setFonts,
  setFontFamily,
}: {
  setFonts: Dispatch<SetStateAction<string[]>>;
  setFontFamily: Dispatch<SetStateAction<string>>;
}) => {
  const editor = useSlate();
  const [fontsList, setFontsList] = useState([]);

  useEffect(() => {
    const loadFonts = async () => {
      const res = await fetch("/api/fonts");
      const data = await res.json();
      setFontsList(data.items || []);
    };
    loadFonts();
  }, []);

  return (
    <div className="modal">
      <div className="flex justify-between items-center">
        <input
          id="font-search"
          type="search"
          placeholder="Search Fonts"
          className="border-1 p-2 rounded-sm"
        />
        <div className="flex gap-4">
          <div>Scripts</div>
          <div>Show</div>
          <div>Sort</div>
        </div>
      </div>

      <div className="mt-4 h-100 border-1 overflow-auto space-y-2 rounded-sm">
        {fontsList.length > 0 ? (
          fontsList.map((font: WebFont) => (
            <li
              key={font.family}
              className="p-2 border-b border-gray-200"
              onClick={() => {
                loadGoogleFont(font.family);
                setFontFamily(font.family);
                setFonts((prev: string[]) => [...prev, font.family]);
                CustomEditor.setFontFamily(editor, font.family);
              }}
            >
              {font.family}
            </li>
          ))
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
};
export default CustomFontSelector;
