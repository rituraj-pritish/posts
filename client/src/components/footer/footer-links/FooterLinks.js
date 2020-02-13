import React from 'react';

import Text from 'src/components/ui/Text';
import { StyledFooterLinks } from './FooterLinks.styles';
import { Link } from 'react-router-dom';

const FooterLinks = () => {
  return (
    <StyledFooterLinks>
      <ul>
        <Text fontSize='1.8rem' mb='1rem'>Popular Tags</Text>
        <li>
          <Link to='/posts/life'>Life</Link>
        </li>
        <li>
          <Link to='/posts/productivity'>Productivity</Link>
        </li>
        <li>
          <Link to='/posts/business'>Business</Link>
        </li>
        <li>
          <Link to='/posts/education'>Education</Link>
        </li>
        <li>
          <Link to='/posts/health'>Health</Link>
        </li>
      </ul>

      <ul>
        <Text fontSize='1.8rem' mb='1rem'>Posts</Text>
        <li>
          <Link to='/posts'>Popular Posts</Link>
        </li>
        <li>
          <Link to='/posts'>Trending Posts</Link>
        </li>
        <li>
          <Link to='/posts'>Most Read Posts</Link>
        </li>
        <li>
          <Link to='/posts'>Most Liked Posts</Link>
        </li>
        <li>
          <Link to='/posts'>Most Discussed Posts</Link>
        </li>
      </ul>
    </StyledFooterLinks>
  );
};

export default FooterLinks;
