import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history.location]);
  return <div>{children}</div>;
};

export default withRouter(ScrollToTop);