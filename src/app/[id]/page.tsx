import EditorComponent from "@/app/components/EditorComponent/EditorComponent";
import { getDocument } from "@/app/actions";
import { notFound } from "next/navigation";

async function Document({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params;
  const docId = awaitedParams.id;
  const docValue = await getDocument(docId);

  if (!docValue) {
    notFound();
  }

  return (
    <div className="p-10">
      <h2 className="text-[2rem] mb-4">title</h2>
      <div className="flex flex-col gap-10 items-center justify-center">
        <EditorComponent docId={docId} docValue={docValue} />
      </div>
    </div>
  );
}

export default Document
