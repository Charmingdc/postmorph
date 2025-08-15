"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchUserCustomVoices from "@/lib/fetchUserCustomVoices";

import VoiceListLoader from "./VoiceListLoader";
import VoiceBox from "./VoiceBox";
import NoDataCard from "@/components/ui/no-data-card";
import { ErrorBox } from "@/components/ui/errorbox";

const VoiceList = ({ userId }: { userId: string }) => {
  const [refreshToken, setRefreshToken] = useState<number>(0);

  const {
    data: voices = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["customVoices", userId, refreshToken],
    queryFn: () => fetchUserCustomVoices(userId),
    enabled: !!userId
  });

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center mt-4">
      {isLoading ? (
        [...Array(3)].map((_, i) => <VoiceListLoader key={i} />)
      ) : isError ? (
        <ErrorBox message="Failed to load voices" />
      ) : voices.length > 0 ? (
        voices.map((voice, index) => (
          <VoiceBox
            key={voice.id}
            index={index}
            voice={voice}
            onDataUpdate={() => setRefreshToken(t => t + 1)}
          />
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
