import { MdFormatColorText, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdOutlinePrint } from 'react-icons/md'
import Dropdown from './Dropdown'

const SecondaryHearder = () => {
  return (
    <div className="h-10 flex 10 justify-between">
      <div className="flex">
        <section className="flex">
          <MdOutlinePrint />
          <Dropdown/>
        </section>
        <section>
          <div>
            Dropdown styles
          </div>
        </section>
        <section>
          <div>
            Font
          </div>
        </section>
        <section>
          <div>
            Font Size
          </div>
        </section>
        <section className="flex">
          <button className="w-5 h-5 white">
            <MdFormatBold />
          </button>
          <button className="w-5 h-5 white">
            <MdFormatItalic />
          </button>
          <button className="w-5 h-5">
            <MdFormatUnderlined />
          </button>
          <div>
            <MdFormatColorText />
          </div>
          <div>
            Hightlight Color
          </div>
        </section>
        <section>
          <div>
            Insert Link
          </div>
          <div>
            Add Comment
          </div>
          <div>
            Insert Image
          </div>
        </section>
        <section>
          <div>
            Indent
          </div>
          <div>
            Line Spacing
          </div>
          <div>
            Checklist
          </div>
          <div>
            Bullet Points
          </div>
          <div>
            Numbered List
          </div>
          <div>
            Decrease Indent
          </div>
          <div>
            Increase Indent
          </div>
          <div>
            Clear Formatting
          </div>
        </section>
      </div>
      <div className="flex">
        <section>
          Editing Dropdown
        </section>
        <section>
          Hide Menu
        </section>
      </div>
    </div>
  )
}

export default SecondaryHearder;
