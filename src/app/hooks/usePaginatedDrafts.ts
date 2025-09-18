import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import type { DraftType } from "@/types/index";
import type {
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
  RealtimePostgresDeletePayload
} from "@supabase/supabase-js";

const PAGE_SIZE = 10;

const usePaginatedDrafts = (userId: string) => {
  const [page, setPage] = useState(0);
  const [drafts, setDrafts] = useState<DraftType[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const supabase = createClient();

  const fetchDrafts = useCallback(
    async (from: number, to: number) => {
      const res = await fetch(
        `/api/getDrafts?userId=${userId}&from=${from}&to=${to}`
      );
      const json = await res.json();
      return json.drafts as DraftType[];
    },
    [userId]
  );

  // Load initial drafts
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

  // Fetch more drafts for pagination
  const fetchMore = async () => {
    if (isFetching) return;
    setIsFetching(true);

    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const data = await fetchDrafts(from, to);

    if (!data || data.length === 0) {
      setIsDone(true);
    } else {
      setDrafts(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
      if (data.length < PAGE_SIZE) setIsDone(true);
    }

    setIsFetching(false);
  };

  // Supabase real-time updates for page 0
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "drafts" },
        (
          payload:
            | RealtimePostgresInsertPayload<DraftType>
            | RealtimePostgresUpdatePayload<DraftType>
            | RealtimePostgresDeletePayload<DraftType>
        ) => {
          if (payload.eventType === "INSERT" && page === 0) {
            setDrafts(prev => [payload.new, ...prev].slice(0, PAGE_SIZE));
          } else if (payload.eventType === "UPDATE") {
            setDrafts(prev =>
              prev.map(d => (d.id === payload.new.id ? payload.new : d))
            );
          } else if (payload.eventType === "DELETE") {
            setDrafts(prev => prev.filter(d => d.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId, page]);

  return { drafts, isInitialLoading, isFetching, isDone, fetchMore };
};

export default usePaginatedDrafts;
