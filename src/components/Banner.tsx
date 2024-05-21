import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface CarouselBannerProps {}

const CarouselBanner: React.FC<CarouselBannerProps> = () => {
  const photos = [
    '/images/photo1.webp',
    '/images/photo2.webp',
    '/images/photo3.webp',
  ];

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-banner" style={{ backgroundColor: 'white' }}>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index}>
            <Image src={photo} alt={`Slide ${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselBanner;

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
}
