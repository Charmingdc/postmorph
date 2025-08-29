import { useEffect } from "react";

export const useInitScrollAnimations = () => {
  useEffect(() => {
    const animateElements = () => {
      const animatedElements = document.querySelectorAll(
        ".scroll-fade-in, .scroll-fade-in-left, .scroll-fade-in-right, .scroll-scale-in"
      );

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              // Once the animation is complete, we can stop observing this element
              if (entry.target.classList.contains("visible")) {
                observer.unobserve(entry.target);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px"
        }
      );

      animatedElements.forEach(element => {
        observer.observe(element);
      });

      return () => {
        animatedElements.forEach(element => {
          observer.unobserve(element);
        });
      };
    };

    // Run on first load
    const cleanup = animateElements();

    return cleanup;
  }, []);
};
