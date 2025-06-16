import EditorComponent from "./components/EditorComponent";
import SecondaryHearder from "./components/SecondaryHeader/SecondaryHeader";

export default function Home() {
  return (
    <div className="p-5">
      <SecondaryHearder/>
      <EditorComponent/>
    </div>
  );
}
