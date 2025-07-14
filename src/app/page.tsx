import DocumentsList from "./components/DocumentsList/DocumentsList";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center py-10">
      <DocumentsList/>
    </div>
  );
}
