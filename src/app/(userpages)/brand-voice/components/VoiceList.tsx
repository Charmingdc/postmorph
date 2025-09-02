"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import fetchUserCustomVoices from "@/lib/fetchUserCustomVoices";

import VoiceListLoader from "./VoiceListLoader";
import VoiceBox from "./VoiceBox";
import NoDataCard from "@/components/ui/no-data-card";
import { ErrorBox } from "@/components/ui/errorbox";

const VoiceList = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const {
    data: voices,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["customVoices", userId],
    queryFn: () => fetchUserCustomVoices(userId),
    enabled: !!userId
  });

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "custom_voices" },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["customVoices", userId]
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient, userId]);

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center mt-4">
      {isLoading ? (
        [...Array(3)].map((_, i) => <VoiceListLoader key={i} />)
      ) : isError ? (
        <ErrorBox message="Failed to load voices" />
      ) : voices && voices.length > 0 ? (
        voices.map((voice, index) => (
          <VoiceBox key={voice.id} index={index} voice={voice} />
        ))
      ) : (
        <NoDataCard
          title="No custom styles yet"
          message={`You haven't added any custom writing style, click the "Add New Custom Voice" button above to add one.`}
        />
      )}
    </div>
  );
};

export default VoiceList;
