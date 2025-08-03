import { Skeleton } from "@/components/ui/skeleton";

const VoiceListLoader = () => {
  return (
    <div className="w-full flex flex-col items-start gap-4 p-4 rounded-xl bg-card border border-border relative">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center">
        <Skeleton className="w-4 h-4 rounded-full" />
      </div>

      <div className="flex-1 w-full space-y-2">
        <Skeleton className="w-1/2 h-5 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md" />
      </div>

      <div className="flex items-center justify-between w-full pt-2">
        <Skeleton className="w-20 h-4 rounded-md" />
        <Skeleton className="w-16 h-4 rounded-md" />
      </div>
    </div>
  );
};

export default VoiceListLoader;
