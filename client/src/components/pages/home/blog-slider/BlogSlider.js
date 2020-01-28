import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './BlogSlider.css';

import Text from '../../../common/Text';
import Button from '../../../common/Button';
import {
  Slide,
  SwiperContainer,
  Background,
  BannerContainer,
  Banner
} from './BlogSlider.styles';

const params = {
  slidesPerView: 'auto',
  loop: true,
  spaceBetween: 20,
  centeredSlides: true,
  containerClass: 'carousel-container',
  swiperSlide: 'swiper-slide',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
};

const BlogSlider = ({ posts }) => {
  const slides = posts.map(({ title, author, imageUrl, date }) => (
    //todo change key to id
    <Slide key={imageUrl}>
      <Background url={imageUrl} />
      <BannerContainer>
        <Banner>
          <Text fontSize='2rem' fontWeight='bold' mb='10px'>
            {title}
          </Text>
          <Text color='gray'>- {author}</Text>
          <Text color='gray' position='absolute' right='25px' top='25px'>
            {date}
          </Text>
          <Button variant='secondary' bg='transparent'>
            Read more
          </Button>
        </Banner>
      </BannerContainer>
    </Slide>
  ));

  return (
    <SwiperContainer>
      <Swiper {...params}>{slides}</Swiper>
    </SwiperContainer>
  );
};

export default BlogSlider;
