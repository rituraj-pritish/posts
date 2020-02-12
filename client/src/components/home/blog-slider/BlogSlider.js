import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';

import Text from 'src/components/ui/Text';
import Button from 'src/components/ui/Button';
import joinName from 'src/utils/joinName';

import {
  Slide,
  SwiperContainer,
  Background,
  BannerContainer,
  Banner
} from './BlogSlider.styles';

import 'swiper/css/swiper.css';
import './BlogSlider.css';

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
  const slides = posts.map(
    ({ title, user: { firstName, lastName }, imageUrl, date, _id }) => {
      const name = joinName(firstName, lastName);

      return (
        <Slide key={_id}>
          <Link to={`/post/${_id}`}>
            <Background url={imageUrl} />
            <BannerContainer>
              <Banner>
                <div>
                  <Text
                    fontSize={['1.5rem', '1.7rem', '2rem']}
                    fontWeight='bold'
                    mb='10px'
                  >
                    {title[0].toUpperCase() + title.slice(1)}
                  </Text>
                  <Text color='gray' fontSize={['1.3rem', '1.6rem']}>
                    - {name}
                  </Text>
                </div>
                <Text
                  color='gray'
                  position='absolute'
                  right='25px'
                  top='25px'
                  fontSize={['1.3rem', '1.6rem']}
                >
                  <Moment format='D MMM YYYY'>{date}</Moment>
                </Text>
                <Button
                  variant='secondary'
                  bg='transparent'
                  gridColumn='1'
                  width='150px'
                  height='35px'
                >
                  Read more
                </Button>
              </Banner>
            </BannerContainer>
          </Link>
        </Slide>
      );
    }
  );

  return (
    <SwiperContainer>
      <Swiper {...params}>{slides}</Swiper>
    </SwiperContainer>
  );
};

export default BlogSlider;

BlogSlider.propTypes = {
  posts: PropTypes.array.isRequired
};
