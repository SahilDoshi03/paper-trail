import { auth } from "@/auth";
import Auth from "./components/Auth/Auth";
import DocumentListPage from "./components/DocumentsList/DocumentListPage";

export default async function Home() {
  const session = await auth()

  return (
    <>
      {
        session?.user ?
          <DocumentListPage/>:
          <Auth />
      }
    </>
  );
}
