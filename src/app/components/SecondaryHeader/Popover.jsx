import { useRef, useState, useEffect } from "react";

export default function Popover({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div className="absolute top-full mb-2 left-1/2 -translate-x-1/2 z-20 min-w-[200px] p-2 bg-[#333333] 
          text-sm text-white rounded-sm shadow-md transition-all duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
