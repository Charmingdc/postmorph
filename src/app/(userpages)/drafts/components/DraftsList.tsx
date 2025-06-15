import DraftController from "@/components/drafts/DraftController";
import fetchUserDrafts from "@/lib/drafts/fetchUserDrafts";

const DraftsList = async ({ currentUserId }: { currentUserId: string }) => {
  const drafts = await fetchUserDrafts(currentUserId);

  return <DraftController drafts={drafts} />;
};

export default DraftsList;
