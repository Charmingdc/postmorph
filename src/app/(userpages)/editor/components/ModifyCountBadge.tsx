import getProfile from "@/lib/user/server";
import type { Profile } from "@/types/index";

import { AlertTriangle, CheckCircle } from "lucide-react";

const ModifyCountBadge = async ({ modifyCount }: { modifyCount: number }) => {
  const profile: Profile = await getProfile();

  let modifyLimit: string;
  if (profile.plan === "pro") {
    modifyLimit = 10;
  } else if (profile.plan === "creator") {
    modifyLimit = 6;
  } else if (profile.plan === "free" || profile.plan === "starter") {
    modifyLimit = 3;
  }

  return (
    <div className="flex justify-end">
      <div
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${
          modifyCount < modifyLimit
            ? "border-green-300 text-green-700 bg-green-100"
            : "border-red-300 text-red-600 bg-red-100"
        }`}
      >
        {modifyCount < modifyLimit ? (
          <>
            <AlertTriangle className="w-3.5 h-3.5" />
            {modifyLimit - modifyCount} refinement
            {modifyLimit - modifyCount !== 1 && "s"}
            left
          </>
        ) : (
          <>
            <CheckCircle className="w-3.5 h-3.5" />
            All refinements used up
          </>
        )}
      </div>
    </div>
  );
};

export default ModifyCountBadge;
