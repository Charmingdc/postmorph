import { useEffect, RefObject } from "react";

export default function useAutoGrowTextarea(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const maxHeight = 450;

    const resize = () => {
      el.style.height = "auto";
      const newHeight = Math.min(el.scrollHeight, maxHeight);
      el.style.height = `${newHeight}px`;
    };
    resize();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [ref, value]);
}
