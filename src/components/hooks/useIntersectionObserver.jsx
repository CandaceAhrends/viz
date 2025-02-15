import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = ({ trigger }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    let observer;
    if (observerRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, {});

      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current && observer) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [trigger]);

  return [observerRef, isIntersecting];
};

export default useIntersectionObserver;
