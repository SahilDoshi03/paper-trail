'use client'

import { useEffect, useState } from "react"
import type { WebFont } from '@/app/types/Font'

const CustomFontSelector = () => {
  const [fontsList, setFontsList] = useState([])

  useEffect(() => {
    const loadFonts = async () => {
      const res = await fetch('/api/fonts');
      const data = await res.json();
      console.log("DATA", data)
      setFontsList(data.items || []);
    };
    loadFonts();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <input id="font-search" type="search" placeholder="Search Fonts" className="border-1 p-2 rounded-sm"/>
        <div className="flex gap-4">
          <div>Scripts</div>
          <div>Show</div>
          <div>Sort</div>
        </div>
      </div>

      <div className="mt-4 h-100 border-1 overflow-auto space-y-2 rounded-sm">
        {fontsList.length > 0 ?
          fontsList.map((font: WebFont) => (
            <li key={font.family} className="p-2 border-b border-gray-200">
              {font.family}
            </li>
          )) : <>Loading...</>}
      </div>
    </>)
}
export default CustomFontSelector
