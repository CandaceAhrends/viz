import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = ({
  rootMargin = '0px',
  threshold = 0.1,
} = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { root, rootMargin, threshold }
      );
      if (observerRef.current) {
        observer.observe(observerRef.current);
      }
    }

    return () => {
      if (observerRef.current && rootRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [rootRef, rootMargin, threshold]);

  return [observerRef, rootRef, isIntersecting];
};

export default useIntersectionObserver;
