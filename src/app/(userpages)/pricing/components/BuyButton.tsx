"use client";

import { useRouter } from "next/navigation";

const BuyButton = ({ purchaseLink }: { purchaseLink: string }) => {
  return (
    <button
      onClick={() => useRouter().push(purchaseLink)}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
    >
      Buy Credits
    </button>
  );
};
export default BuyButton;
