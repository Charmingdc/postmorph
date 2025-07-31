"use client";

import { Copy, CopyCheck } from "lucide-react";

type Props = {
  copied: boolean;
  onCopy: () => void;
};

const CopyButton = ({ copied, onCopy }: Props) => {
  return (
    <button type="button" onClick={onCopy}>
      {copied ? (
        <CopyCheck size={18} className="text-green-400" />
      ) : (
        <Copy size={18} className="text-muted-foreground" />
      )}
    </button>
  );
};

export default CopyButton;
