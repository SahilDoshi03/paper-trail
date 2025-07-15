'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createDocument } from "@/app/actions/Document"

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
      const document = await createDocument('Untitled Document')
      if (document) {
        router.push(`/${document.id}`)
      }
    }
  }

  return (
    <div className='w-[200px] flex flex-col border-1 cursor-pointer' onClick={handleClick}>
      <Image
        src={image}
        alt={`${title} preview image`}
        height={300}
        width={200}
      />
      <div className='p-2 truncate text-nowrap text-ellipsis'>
        {title}
      </div>
    </div>
  )
}

export default DocumentPreviewItem
