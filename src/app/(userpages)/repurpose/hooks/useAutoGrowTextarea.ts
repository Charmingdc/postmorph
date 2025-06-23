import { useEffect, RefObject } from "react";

export default function useAutoGrowTextarea(
  ref: RefObject<HTMLTextAreaElement>,
  value: string
) {
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value]);
}
