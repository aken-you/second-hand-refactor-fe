import { useRef, useEffect } from 'react';

const useForwardRef = <T>(...refs: React.ForwardedRef<T>[]) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(targetRef.current);
      else ref.current = targetRef.current;
    });
  }, [refs]);

  return targetRef;
};

export default useForwardRef;
