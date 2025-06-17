import EditorComponent from "../EditorComponent/EditorComponent";

const Page = () => {
  return (
    <div className="flex items-center justify-center pb-20">
     {/* This height and width is basically A4 size in pixels */}
      <div className="h-[1123px] w-[794px] bg-[#121212]">
        <EditorComponent/>
      </div>
    </div>
  )
}

export default Page
