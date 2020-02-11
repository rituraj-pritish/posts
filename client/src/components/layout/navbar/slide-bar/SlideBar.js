import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import clickOutside from '../../../../utils/clickOutside';
import Icon from '../../../common/Icon';
import Button from '../../../common/Button';
import Bars from './bars/Bars';
import { StyledSlideBar, StyledList } from './SlideBar.styles';
import Text from '../../../common/Text';

const SlideBar = ({ name }) => {
  const [show, setShow] = useState(false);
  const sliderRef = useRef();
  const barsRef = useRef();
  clickOutside(sliderRef, () => setShow(false), barsRef);

  const authOptions = <></>;

  const noAuthOptions = <></>;

  return (
    <>
      <div ref={barsRef} onClick={() => setShow(!show)}>
        <Icon>
          <Bars show={show} />
        </Icon>
      </div>
      <StyledSlideBar ref={sliderRef} show={show}>
        <Text position='relative' top='-35px' textAlign='left'>
          {name ? (
            `Hi ${name}`
          ) : (
            <Button fontWeight='bold' p='0.5rem 4rem'>
              <Link to='/signin'>Get Started</Link>
            </Button>
          )}
        </Text>
        <StyledList>{name ? authOptions : noAuthOptions}</StyledList>
      </StyledSlideBar>
    </>
  );
};

export default SlideBar;
