import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import type { DraftType } from "@/lib/types";

const PAGE_SIZE = 10;

const usePaginatedDrafts = (userId: string) => {
  const [page, setPage] = useState(0);
  const [drafts, setDrafts] = useState<DraftType[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchDrafts = useCallback(
    async (from: number, to: number) => {
      const res = await fetch(
        `/api/drafts?userId=${userId}&from=${from}&to=${to}`
      );
      const json = await res.json();
      return json.drafts as DraftType[];
    },
    [userId]
  );

  const { refetch, isFetching } = useQuery({
    queryKey: ["drafts", userId, page],
    queryFn: async () => {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      return fetchDrafts(from, to);
    },
    enabled: false
  });

  useEffect(() => {
    const loadInitial = async () => {
      setIsInitialLoading(true);
      const data = await fetchDrafts(0, PAGE_SIZE - 1);
      setDrafts(data);
      setIsDone(data.length < PAGE_SIZE);
      setPage(data.length < PAGE_SIZE ? 0 : 1);
      setIsInitialLoading(false);
    };

    loadInitial();
  }, [fetchDrafts]);

  const fetchMore = async () => {
    const { data } = await refetch();
    if (!data || data.length === 0) return setIsDone(true);

    setDrafts(prev => [...prev, ...data]);
    setPage(prev => prev + 1);
    if (data.length < PAGE_SIZE) setIsDone(true);
  };

  return {
    drafts,
    isInitialLoading,
    isFetching,
    isDone,
    fetchMore
  };
};

export default usePaginatedDrafts;
