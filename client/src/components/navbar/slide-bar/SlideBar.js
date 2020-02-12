import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import clickOutside from 'src/utils/clickOutside';
import Icon from 'src/components/ui/Icon';
import Button from 'src/components/ui/Button';
import Text from 'src/components/ui/Text';
import { signout } from 'src/redux/actions/userActions';

import Bars from './bars/Bars';
import { StyledSlideBar, StyledList } from './SlideBar.styles';

const SlideBar = ({ name, signout }) => {
  const [show, setShow] = useState(false);
  const sliderRef = useRef();
  const barsRef = useRef();
  clickOutside(sliderRef, () => setShow(false), barsRef);

  const authOptions = (
    <>
      <li>
        <Link to='/create-post'>Create Post</Link>
      </li>
    </>
  );

  const noAuthOptions = <></>;

  return (
    <>
      <div ref={barsRef} onClick={() => setShow(!show)}>
        <Icon>
          <Bars show={show} />
        </Icon>
      </div>
      <StyledSlideBar ref={sliderRef} show={show}>
        <Text position='relative' top='-30px' left='-25px' textAlign='left'>
          {name ? (
            `Hi ${name}`
          ) : (
            <Button fontWeight='bold' p='0.5rem 4rem'>
              <Link to='/signin'>Get Started</Link>
            </Button>
          )}
        </Text>
        <StyledList onClick={() => setShow(false)}>
          {name ? authOptions : noAuthOptions}
          <li>
            <Link to='/posts'>Popular posts</Link>
          </li>
          <li>
            <Link to='/posts'>Trending posts</Link>
          </li>
          {name && (
            <li onClick={signout}>
              <Link>Sign Out</Link>
            </li>
          )}
        </StyledList>
      </StyledSlideBar>
    </>
  );
};

export default connect(null, { signout })(SlideBar);
