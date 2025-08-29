import { useRef, useEffect } from "react";

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = "0px"
}: UseScrollAnimationProps = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = (element: HTMLElement | null) => {
    elementRef.current = element;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    const currentRef = elementRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin]);

  return setRef;
};
