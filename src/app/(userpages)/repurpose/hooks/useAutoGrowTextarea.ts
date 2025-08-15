import { useEffect, RefObject } from "react";

export default function useAutoGrowTextarea(
  ref: RefObject<HTMLTextAreaElement>,
  value: string
) {
  useEffect(() => {
    const el = ref.current;
    if (el) {
      const maxHeight = 340;

      el.style.height = "auto";
      const newHeight = Math.min(el.scrollHeight, maxHeight);
      el.style.height = `${newHeight}px`;
    }
  }, [ref, value]);
}
