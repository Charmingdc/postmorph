import getCurrentUserId from "../utils/getCurrentUserId";
import fetchUniqueDraft from "../lib/fetchUniqueDraft";
import ContentEditor from "../components/ContentEditor";
import { ErrorBox } from "@/components/ui/errorbox";

// Next.js 15 App Router automatically infers `params` type from the folder structure
const Page = async ({ params }: { params: { draft_id: string } }) => {
  try {
    const user_id = await getCurrentUserId();
    const draft = await fetchUniqueDraft(user_id, params.draft_id);

    return (
      <main className="w-full flex flex-col items-center">
        <ContentEditor user_id={user_id} draft={draft} />
      </main>
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error loading draft:", err.message);
    }
    return (
      <main className="w-full flex flex-col items-center">
        <ErrorBox message="Something went wrong loading the draft." />
      </main>
    );
  }
};

export default Page;
