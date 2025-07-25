'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createDocument } from "@/actions/Document"
import { CiMenuKebab } from "react-icons/ci";
import Popover from '@/components/common/Popover';
import DocumentListMenuPopover from './DocumentListMenuPopover';

type DocumentPreviewItemProps = {
  image: string,
  title: string,
  id?: string
}

const DocumentPreviewItem = ({ image, title, id }: DocumentPreviewItemProps) => {
  const router = useRouter()

  const handleClick = async () => {
    if (id) {
      router.push(`/${id}`)
    } else {
      const document = await createDocument()
      if (document) {
        router.push(`/${document.id}`)
      }
    }
  }

  return (
    <div className='w-[200px] flex flex-col rounded-sm border-1'>
      <Image
        className='cursor-pointer'
        src={image}
        alt={`${title} preview image`}
        height={300}
        width={200}
        onClick={handleClick}
      />
      <div className='flex items-center justify-between p-2'>
        <div
          className='cursor-pointer p-2 max-w-[160px] truncate text-nowrap text-ellipsis'
          onClick={handleClick}
        >
          {title}
        </div>
        <Popover
          trigger={
            <button
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              className="icon-btn"
              type="button"
            >
              <CiMenuKebab size={20} />
            </button>
          }
        >
          <DocumentListMenuPopover id={id as string} />
        </Popover>
      </div>
    </div>
  )
}

export default DocumentPreviewItem
