import React from 'react';

import Div from '../../../ui/Div';
import Text from '../../../ui/Text';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import FacebookIcon from 'src/assets/icons/FacebookIcon';
import InstagramIcon from 'src/assets/icons/InstagramIcon';
import TwitterIcon from 'src/assets/icons/TwitterIcon';
import GooglePlusIcon from 'src/assets/icons/GooglePlusIcon';
import { SocialIcons } from '../Sidebar.styles';

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
