import React from 'react';

import Div from '../../../common/Div';
import Text from '../../../common/Text';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import FacebookIcon from '../../../../assets/FacebookIcon';
import InstagramIcon from '../../../../assets/InstagramIcon';
import TwitterIcon from '../../../../assets/TwitterIcon';
import GooglePlusIcon from '../../../../assets/GooglePlusIcon';
import { SocialIcons } from '../sidebar/Sidebar.styles';

const JoinUs = () => {
  return (
    <Div width='100%' padding='2rem' mb='2rem' bg='grey' color='black'>
      <Text textAlign='center' fontWeight='bold' fontSize='2rem'>
        Follow Us
      </Text>
      <SocialIcons>
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
        <GooglePlusIcon />
      </SocialIcons>

      <Text
        fontWeight='bold'
        textAlign='center'
        mb='2rem'
        mt='8rem'
        fontSize='2rem'
      >
        Join our Mailing List
      </Text>
      <Input type='text' placeholder='Email' height='4rem' mb='1rem' />
      <Button width='100%' height='4rem' mb='1rem'>
        Subscribe
      </Button>
    </Div>
  );
};

export default JoinUs;
