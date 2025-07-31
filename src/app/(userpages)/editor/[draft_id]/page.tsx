import getCurrentUserId from "../utils/getCurrentUserId";
import fetchUniqueDraft from "../utils/fetchUniqueDraft";
import ContentEditor from "../components/ContentEditor";

import type { DraftType } from "@/types/index";

type PageProps = {
  params: {
    draft_id: string;
  };
};

const Page = async ({ params }: PageProps) => {
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
      console.log("Error loading draft:", err.message);
    }
    return (
      <main className="text-center p-8">
        Something went wrong loading the draft.
      </main>
    );
  }
};

export default Page;
