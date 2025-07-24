'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createDocument } from "@/app/actions/Document"
import { CiMenuKebab } from "react-icons/ci";

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
    <div className='w-[200px] flex flex-col rounded-sm overflow-hidden border-1 cursor-pointer' onClick={handleClick}>
      <Image
        src={image}
        alt={`${title} preview image`}
        height={300}
        width={200}
      />
      <div className='flex items-center justify-between p-2'>
        <div className='p-2 max-w-[160px] truncate text-nowrap text-ellipsis'>
          {title}
        </div>
        <CiMenuKebab size={20}/>
      </div>
    </div>
  )
}

export default DocumentPreviewItem
