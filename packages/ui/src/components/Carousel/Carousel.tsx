/**
 * Carousel Component
 * Accessible carousel/slider using Swiper with full a11y support
 */

import React, { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { CarouselProps } from './Carousel.types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.bootstrap.scss';

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      slides,
      autoplay = false,
      autoplayDelay = 3000,
      navigation = true,
      pagination = true,
      loop = true,
      brand,
      className = '',
      'aria-label': ariaLabel,
      slidesPerView = 1,
      spaceBetween = 0,
      ...rest
    },
    ref
  ) => {
    const carouselId = useId();

    // Build CSS classes
    const classes = [
      'carousel-container',
      brand && `carousel-brand-${brand}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build Swiper modules
    const modules = [A11y];
    if (navigation) modules.push(Navigation);
    if (pagination) modules.push(Pagination);
    if (autoplay) modules.push(Autoplay);

    return (
      <div className={classes} ref={ref} {...rest}>
        <Swiper
          modules={modules}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          navigation={navigation}
          pagination={pagination ? { clickable: true } : false}
          loop={loop}
          autoplay={
            autoplay
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          }}
          role="region"
          aria-label={ariaLabel || 'Carousel'}
          id={carouselId}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} role="group" aria-label={`${index + 1} / ${slides.length}`}>
              {slide.content}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;
