"use client";

import { useQuery } from "@tanstack/react-query";
import fetchUserCustomVoices from "@/lib/fetchUserCustomVoices";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBox } from "@/components/ui/errorbox";

const VoiceCountBar = ({ userId }: { userId: string }) => {
  const {
    data: voices = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["customVoices", userId],
    queryFn: () => fetchUserCustomVoices(userId)
  });

  const percent: number = (voices.length / 3) * 100;

  return (
    <div className="w-full flex flex-col justify-center gap-2 border-2 border-card p-4 rounded-xl mt-4">
      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Skeleton className="w-full h-[.4rem]" />
          <Skeleton className="w-full h-4 rounded-lg" />
        </div>
      ) : isError ? (
        <ErrorBox message="Failed to load voices" />
      ) : (
        <>
          <p>
            <strong>{voices.length}</strong> out of <strong>3</strong> voices
            created
          </p>
          <Progress value={percent} />
        </>
      )}
    </div>
  );
};

export default VoiceCountBar;
