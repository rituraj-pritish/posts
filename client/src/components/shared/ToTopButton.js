import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 5;
  max-width: 1366px;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Top = styled.div`
  pointer-events: all;
  z-index: 5;
  position: fixed;
  height: 40px;
  font-size: 30px;
  width: 40px;
  background: #000000bf;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 100px;
  right: 50px;
  cursor: pointer;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

const ToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const y = window.pageYOffset;
      const ht = window.innerHeight * 0.5;

      if (y > ht) setShow(true);

      if (y < ht) setShow(false);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Top show={show} onClick={scrollToTop}>
        &uarr;
      </Top>
    </Container>
  );
};

export default ToTopButton;