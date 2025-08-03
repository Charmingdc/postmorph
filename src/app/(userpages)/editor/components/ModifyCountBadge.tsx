import { AlertTriangle, CheckCircle } from "lucide-react";

const ModifyCountBadge = ({ modifyCount }: { modifyCount: number }) => {
  return (
    <div className="flex justify-end">
      <div
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${
          modifyCount < 3
            ? "border-green-300 text-green-700 bg-green-100"
            : "border-red-300 text-red-600 bg-red-100"
        }`}
      >
        {modifyCount < 3 ? (
          <>
            <AlertTriangle className="w-3.5 h-3.5" />
            {3 - modifyCount} refinement{3 - modifyCount !== 1 && "s"} left
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
