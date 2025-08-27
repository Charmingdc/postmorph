import { AlertTriangle, CheckCircle } from "lucide-react";

type PageProps = {
  modifyCount: number;
  userPlan: "free" | "starter" | "creator" | "pro";
};

const ModifyCountBadge = ({ modifyCount, userPlan }: PageProps) => {
  console.log("user plan:", userPlan);
  let modifyLimit: number;
  if (userPlan === "pro") {
    modifyLimit = 10;
  } else if (userPlan === "creator") {
    modifyLimit = 6;
  } else if (userPlan === "free" || userPlan === "starter") {
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
            {modifyLimit - modifyCount !== 1 && "s"} left
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
