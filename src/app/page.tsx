import { auth } from "@/auth";
import DocumentsList from "./components/DocumentsList/DocumentsList";
import { signIn } from "@/auth";

export default async function Home() {
  const session = await auth()

  return (
    <>
      {
        session?.user ?
          (<div className="flex flex-col gap-10 items-center justify-center py-10">
            <DocumentsList />
          </div>) :
          (<form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button
              className="cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
          </form>)
      }
    </>
  );
}
