import { Skeleton } from "@/components/ui/skeleton";

const DraftLoader = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className='w-full flex flex-col gap-2 p-4 border rounded-xl
          my-3'
        >
          {/* Type Tag Placeholder */}
          <Skeleton className='w-20 h-10 mb-3 rounded-xl' />

          {/* Content Placeholder */}
          <Skeleton className='w-full h-32 rounded-xl' />

          {/* Buttons */}
          <div className='w-full flex items-center gap-4 mt-4'>
            <Skeleton className='w-14 h-10 rounded-xl' />
            <Skeleton className='w-14 h-10 rounded-xl' />
            <Skeleton className='w-14 h-10 rounded-xl' />
          </div>
        </div>
      ))}
    </>
  );
};

export default DraftLoader;
