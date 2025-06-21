'use client'

import { useState } from 'react'
import Modal from '../common/Modal';
import CustomFontSelector from './CustomFontSelector';

const FontsPopover = () => {
  const fonts = ['Arial', 'Calibri', 'Roboto', 'Times New Roman'];
  const [customModalOpen, setCustomModalOpen] = useState(false)

  return (
    <>
      <ul className="flex flex-col w-max">
        <li className="border-b p-2 font-semibold cursor-pointer" onClick={() => setCustomModalOpen(true)}>Custom</li>
        {fonts.map((font) => (
          <li key={font} className="p-2 hover:bg-[#222222] cursor-pointer" style={{ fontFamily: font }}>
            {font}
          </li>
        ))}
      </ul>
      {customModalOpen &&
        <Modal
          title={"Fonts"}
          open={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
          children={<CustomFontSelector/>}
        />}
    </>
  );
};

export default FontsPopover;

