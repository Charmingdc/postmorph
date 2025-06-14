import { Skeleton } from "@/components/ui/skeleton";

const DraftLoader = () => {
  return (
    <div className='w-full flex flex-col gap-2 bg-card p-4 border rounded-xl'>
      {/* Type Tag Placeholder */}
      <Skeleton className='w-20 h-6 mb-3 rounded-md' />

      {/* Content Placeholder */}
      <Skeleton className='w-full h-32 rounded-md' />

      {/* Buttons */}
      <div className='w-full flex items-center gap-4 mt-4'>
        <Skeleton className='w-24 h-10 rounded-md' />
        <Skeleton className='w-24 h-10 rounded-md' />
      </div>
    </div>
  );
};

export default DraftLoader;