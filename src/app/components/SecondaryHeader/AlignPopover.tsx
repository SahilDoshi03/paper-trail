import {
  MdOutlineFormatAlignJustify,
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignRight,
  MdOutlineFormatAlignCenter,
} from "react-icons/md";

const AlignPopover = () => {
  return (
    <div className="flex gap-1">
      <MdOutlineFormatAlignLeft size={25} className="icon-btn" />
      <MdOutlineFormatAlignCenter size={25} className="icon-btn" />
      <MdOutlineFormatAlignRight size={25} className="icon-btn" />
      <MdOutlineFormatAlignJustify size={25} className="icon-btn" />
    </div>
  );
};

export default AlignPopover;
