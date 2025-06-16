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
  MdFormatClear
} from "react-icons/md";
import Dropdown from "./Dropdown";

const SecondaryHearder = () => {
  return (
    <div className="h-10 flex justify-between items-center p-5 rounded-full bg-[#222222]">
      <div className="flex items-center">
        <section className="flex items-center gap-2 px-2 border-r-1">
          <MdOutlinePrint />
          <Dropdown />
        </section>
        <section className="flex items-center gap-2 px-2 border-r-1">
          <div>Dropdown styles</div>
        </section>
        <section className="flex items-center gap-2 px-2 border-r-1">
          <div>Font</div>
        </section>
        <section className="flex items-center gap-2 px-2 border-r-1">
          <div>Font Size</div>
        </section>
        <section className="flex items-center gap-2 px-2 border-r-1">
          <button className="w-5 h-5 white">
            <MdFormatBold />
          </button>
          <button className="w-5 h-5 white">
            <MdFormatItalic />
          </button>
          <button className="w-5 h-5">
            <MdFormatUnderlined />
          </button>
          <button>
            <MdFormatColorText />
          </button>
          <button>
            <MdBrush />
          </button>
        </section>
        <section className="flex items-center gap-2 px-2 border-r-1">
          <button>
            <MdAddLink />
          </button>
          <button>
            <MdOutlineAddComment />
          </button>
          <button>
            <MdOutlineImage />
          </button>
        </section>
        <section className="flex items-center gap-2 px-2 ">
          <button><MdFormatIndentDecrease/></button>
          <button><MdFormatLineSpacing/></button>
          <button><MdChecklist/></button>
          <button><MdFormatListBulleted/></button>
          <button><MdFormatListNumbered/></button>
          <button><MdFormatIndentIncrease/></button>
          <button><MdFormatIndentDecrease/></button>
          <button><MdFormatClear/></button>
        </section>
      </div>
      <div className="flex items-center gap-2">
        <section className="border-r-1 px-2 ">Editing Dropdown</section>
        <section>Hide Menu</section>
      </div>
    </div>
  );
};

export default SecondaryHearder;
