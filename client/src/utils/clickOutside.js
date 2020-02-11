import { useEffect } from 'react';

export default (ref, handler, exception) => {
  useEffect(() => {
    const listener = e => {
      if (exception && exception.current.contains(e.target)) {
        return;
      } else if (!ref.current || ref.current.contains(e.target)) {
        return;
      } else {
        handler(e);
      }
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler, exception]);
};
