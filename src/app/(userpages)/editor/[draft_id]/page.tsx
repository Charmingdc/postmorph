import getCurrentUserId from "../utils/getCurrentUserId";
import fetchUniqueDraft from "../lib/fetchUniqueDraft";
import ContentEditor from "../components/ContentEditor";
import { ErrorBox } from "@/components/ui/errorbox";

type DraftPageProps = {
  params: Promise<{ draft_id: string }>;
};

const Page = async ({ params }: DraftPageProps) => {
  try {
    const { draft_id } = await params;
    const user_id = await getCurrentUserId();
    const draft = await fetchUniqueDraft(user_id, draft_id);

    return (
      <main className="w-full flex flex-col items-center">
        <ContentEditor user_id={user_id} draft={draft} />
      </main>
    );
  } catch (err: unknown) {
    return (
      <main className="w-full flex flex-col items-center">
        <ErrorBox
          message={`${
            err instanceof Error
              ? err.message
              : "Something went wrong loading the draft"
          }`}
        />
      </main>
    );
  }
};

export default Page;
