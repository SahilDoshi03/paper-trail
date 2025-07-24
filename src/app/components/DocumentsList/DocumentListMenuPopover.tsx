const DocumentListMenuPopover = () => {
  return (
    <>
      <ul className="flex flex-col w-max">
        <li className="p-2 hover:bg-[#222222] cursor-pointer">
          Rename
        </li>
        <li className="p-2 hover:bg-[#222222] cursor-pointer">
          Delete
        </li>
        <li className="p-2 hover:bg-[#222222] cursor-pointer">
          Open in new tab
        </li>
        <li className="p-2 hover:bg-[#222222] cursor-pointer">
          Make available offline
        </li>
      </ul>
    </>
  );
};

export default DocumentListMenuPopover;
