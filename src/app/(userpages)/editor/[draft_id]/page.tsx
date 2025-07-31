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
  const runFuncs = async () => {
    try {
      const user_id = await getCurrentUserId();

      const draft: DraftType = await fetchUniqueDraft(user_id, params.draft_id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(error.message);
      }
    }
  };
  await runFuncs();

  return (
    <main className="w-full flex flex-col items-center">
      <ContentEditor user_id={user_id} draft={draft} />
    </main>
  );
};

export default Page;
