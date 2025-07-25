import DocumentListHeader from "./DocumentListHeader"
import DocumentsList from "./DocumentsList"

const DocumentListPage = () => {
  return(
    <div className="flex flex-col gap-5 bg-surface-default">
      <DocumentListHeader/>
      <DocumentsList/>
    </div>
    
  )
}

export default DocumentListPage;
