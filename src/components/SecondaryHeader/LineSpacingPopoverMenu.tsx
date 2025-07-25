import { GoPlus, GoDash } from "react-icons/go";
import { useSlate } from "slate-react";
import { useState } from "react";
import { CustomEditor } from "@/lib/CustomEditor";

const presetLineSpacings = [1, 1.2, 1.5, 2];

const LineSpacingPopoverMenu = () => {
  const editor = useSlate();
  const [lineSpace, setLineSpace] = useState(() =>
    CustomEditor.getLineHeight(editor),
  );
  const [paraSpaceBefore, setParaSpaceBefore] = useState(() => CustomEditor.getParaSpaceBefore(editor));
  const [paraSpaceAfter, setParaSpaceAfter] = useState(() => CustomEditor.getParaSpaceAfter(editor));

  return (
    <ul className="flex flex-col w-max">
      <li className="border-b-1 p-2">
        <div className="font-bold italic mb-1">Line Spacing</div>
        <ul className="flex flex-col gap-1">
          {presetLineSpacings.map((val) => (
            <li
              key={val}
              className={`mt-1 cursor-pointer px-2 py-1 rounded ${lineSpace === val
                ? "bg-[#222222] text-white"
                : "hover:bg-[#222222]"
                }`}
              onClick={() => {
                CustomEditor.setLineHeight(editor, val);
                setLineSpace(val);
              }}
            >
              {val}
            </li>
          ))}
          <li className="mb-1">
            <div className="text-xs font-medium">Custom</div>
            <div className="flex items-center justify-center gap-1 px-2 mt-1">
              <GoPlus
                size={20}
                className="icon-btn"
                onClick={() => {
                  const newValue = Math.min(
                    200,
                    parseFloat((lineSpace + 0.01).toFixed(2)),
                  );
                  setLineSpace(newValue);
                  CustomEditor.setLineHeight(editor, newValue);
                }}
              />
              <input
                className="max-w-[60px] text-center border-1 p-1 focus:outline-none rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                step="0.01"
                value={lineSpace?.toString() ?? ""}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);
                  if (value < 0.06) value = 0.06;
                  if (value > 200) value = 200;
                  setLineSpace(value);
                  CustomEditor.setLineHeight(editor, value);
                }}
              />
              <GoDash
                size={20}
                className="icon-btn"
                onClick={() => {
                  const newValue = Math.max(
                    0.06,
                    parseFloat((lineSpace - 0.01).toFixed(2)),
                  );
                  setLineSpace(newValue);
                  CustomEditor.setLineHeight(editor, newValue);
                }}
              />
            </div>
          </li>
        </ul>
      </li>

      <li className="p-2">
        <div className="font-bold italic">Paragraph Spacing</div>

        {/* Paragraph Before */}
        <div className="mt-1">
          <div className="text-xs">Before</div>
          <div className="flex items-center justify-center gap-1 px-2">
            <GoPlus
              size={20}
              className="icon-btn"
              onClick={() => {
                const newSize = Math.min(250, paraSpaceBefore + 1);
                setParaSpaceBefore(newSize);
                CustomEditor.setParaSpaceBefore(editor, newSize);
              }}
            />
            <input
              className="max-w-[30px] text-center border-1 p-1 focus:outline-none rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={paraSpaceBefore}
              onChange={(e) => {
                const value = Math.min(
                  Math.max(parseInt(e.target.value, 10), 0),
                  250,
                );
                setParaSpaceBefore(value);
                CustomEditor.setParaSpaceBefore(editor, value);
              }}
            />
            <GoDash
              size={20}
              className="icon-btn"
              onClick={() => {
                const newSize = Math.max(0, paraSpaceBefore - 1);
                setParaSpaceBefore(newSize);
                CustomEditor.setParaSpaceBefore(editor, newSize);
              }}
            />
          </div>
        </div>

        {/* Paragraph After */}
        <div className="mt-1">
          <div className="text-xs">After</div>
          <div className="flex items-center justify-center gap-1 px-2">
            <GoPlus
              size={20}
              className="icon-btn"
              onClick={() => {
                const newSize = Math.min(250, paraSpaceAfter + 1);
                setParaSpaceAfter(newSize);
                CustomEditor.setParaSpaceAfter(editor, newSize);
              }}
            />
            <input
              className="max-w-[30px] text-center border-1 p-1 focus:outline-none rounded-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={paraSpaceAfter}
              onChange={(e) => {
                const value = Math.min(
                  Math.max(parseInt(e.target.value, 10), 0),
                  250,
                );
                setParaSpaceAfter(value);
                CustomEditor.setParaSpaceAfter(editor, value);
              }}
            />
            <GoDash
              size={20}
              className="icon-btn"
              onClick={() => {
                const newSize = Math.max(0, paraSpaceAfter - 1);
                setParaSpaceAfter(newSize);
                CustomEditor.setParaSpaceAfter(editor, newSize);
              }}
            />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default LineSpacingPopoverMenu;
