import DocumentPreviewItem from "./DocumentPreviewItem"
import type { EditorDocument } from "@/lib/schemas/Document"
import { getDocuments } from "@/actions/Document"

const DocumentsList = async () => {
  const documents = await getDocuments()

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center py-10">
      <section className="w-300">
        <h2 className="text-xl font-bold mb-4">
          Start a new document
        </h2>
        <DocumentPreviewItem
          image="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
          title="Blank Document"
        />
      </section>
      <section className="w-300">
        <h2 className="text-xl font-bold mb-4">
          Recent Documents
        </h2>
        {
          <div className="flex flex-wrap gap-4">
            {documents.map((item: EditorDocument) =>
              <DocumentPreviewItem
                key={item.id}
                id={String(item.id)}
                image="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                title={item.title}
              />)
            }
          </div>
        }
      </section>
    </div>
  )
}

export default DocumentsList
