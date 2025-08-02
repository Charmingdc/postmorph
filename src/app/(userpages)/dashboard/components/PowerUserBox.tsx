import { BadgeCheck } from "lucide-react";

const PowerUserBox = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-green-50 text-green-800 border border-green-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-2">
        <BadgeCheck className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          Power User
        </span>
      </div>
      <h2 className="text-lg font-bold">🚀 Unlimited Access</h2>
      <p className="text-sm mt-1 text-center">
        You can generate content without worrying about credits.
      </p>
    </div>
  );
};

export default PowerUserBox;
