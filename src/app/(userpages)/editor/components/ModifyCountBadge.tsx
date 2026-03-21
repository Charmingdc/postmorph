import { RotateCcw } from "lucide-react";

type PageProps = {
 modifyCount?: number;
};

const ModifyCountBadge = ({ modifyCount = 0 }: PageProps) => {
 const count = modifyCount;

 const label = count === 1 ? "Modification" : "Modifications";

 return (
  <div className="flex justify-end">
   <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-border bg-card text-card-foreground">
    <RotateCcw className="w-3.5 h-3.5" />
    {`${label}: ${count}`}
   </div>
  </div>
 );
};

export default ModifyCountBadge;
