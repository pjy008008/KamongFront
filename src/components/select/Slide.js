import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";


const CustomSlider = styled(Slider)`
  width: 80vw;
  height: 27vh;
  z-index: 1;
  margin: 0 auto;

  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`;
const Image = styled.img`
  width: 26vw;
  height: 20vh;
`;

const ImageContainer = styled.div``;

const BannerSlider = ({images}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <CustomSlider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <Image src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      {/* Add more slides as needed */}
    </CustomSlider>
  );
};

export default BannerSlider;
