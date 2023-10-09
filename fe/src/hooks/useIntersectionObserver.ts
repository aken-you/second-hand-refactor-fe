import { useEffect, useState } from 'react';

interface UseIntersectionObserverProps {
  intersect: () => void;
  root?: null | HTMLElement;
  rootMargin?: string;
  threshold?: number;
}

const useIntersectionObserver = ({
  intersect,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const callback: IntersectionObserverCallback = ([entry]) => {
    if (!entry.isIntersecting) return;

    intersect();
  };

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [target, intersect, root, rootMargin, threshold]);

  return { setTarget };
};

export default useIntersectionObserver;
