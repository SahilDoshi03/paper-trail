'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import { deleteDocument, updateDocument } from "@/actions/Document";

const DocumentListMenuPopover = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRename = () => {
    setIsRenameModalOpen(true);
  };

  const handleRenameConfirm = async () => {
    await updateDocument(id, { title: newDocumentName });
    setIsRenameModalOpen(false);
    router.refresh();
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteDocument(id);
    setIsDeleteModalOpen(false);
    router.refresh();
  };

  const handleOpenInNewTab = () => {
    window.open(`/${id}`, "_blank");
  };

  return (
    <>
      <ul className="flex flex-col w-max">
        <li className="p-2 hover:bg-[#222222] cursor-pointer" onClick={handleRename}>
          Rename
        </li>
        <li className="p-2 hover:bg-[#222222] cursor-pointer" onClick={handleDelete}>
          Delete
        </li>
        <li className="p-2 hover:bg-[#222222] cursor-pointer" onClick={handleOpenInNewTab}>
          Open in new tab
        </li>
        <li className="p-2 hover:bg-[#222222] cursor-pointer">
          Make available offline
        </li>
      </ul>

      {isRenameModalOpen && (
        <Modal
          title="Rename Document"
          open={isRenameModalOpen}
          onClose={() => setIsRenameModalOpen(false)}
        >
          <input
            type="text"
            value={newDocumentName}
            onChange={(e) => setNewDocumentName(e.target.value)}
            placeholder="New document name"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleRenameConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            >
              Rename
            </button>
            <button
              onClick={() => setIsRenameModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          title="Delete Document"
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <p>Are you sure you want to delete this document?</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DocumentListMenuPopover;
