import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    let observer;
    if (observerRef.current) {
      console.log('we haev REFF');
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
  }, [observerRef.current]);

  return [observerRef, isIntersecting];
};

export default useIntersectionObserver;
