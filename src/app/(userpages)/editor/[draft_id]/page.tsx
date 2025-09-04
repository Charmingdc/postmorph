import getCurrentUserId from "../utils/getCurrentUserId";
import fetchUniqueDraft from "../lib/fetchUniqueDraft";
import ContentEditor from "../components/ContentEditor";
import { ErrorBox } from "@/components/ui/errorbox";

type DraftPageProps = {
  params: {
    draft_id: string;
  };
};

const Page = async ({ params }: DraftPageProps) => {
  try {
    // Get the current user ID
    const user_id = await getCurrentUserId();

    // Fetch the draft for this user
    const draft = await fetchUniqueDraft(user_id, params.draft_id);

    return (
      <main className="w-full flex flex-col items-center">
        <ContentEditor user_id={user_id} draft={draft} />
      </main>
    );
  } catch (err: unknown) {
    console.error("Error loading draft:", err);

    return (
      <main className="w-full flex flex-col items-center">
        <ErrorBox message="Something went wrong loading the draft." />
      </main>
    );
  }
};

export default Page;
