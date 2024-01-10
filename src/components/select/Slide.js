import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import axios from "axios";

const API_ENDPOINT = "http://35.216.68.47:8080/api/experiences"; // Define API_ENDPOINT

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

const BannerSlider = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Accept: "*/*",
          },
        });
        const contentArray = response.data.result.content;

        // 전체 체험 정보를 상태 업데이트
        setExperiences(contentArray);
      } catch (error) {
        console.error("에러:", error.message);
      }
    };

    fetchExperiences();
  }, []);

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
      {experiences.map((experience, index) => (
        <div key={index}>
          <Image src={experience.imageUrl} alt={`Slide ${index + 1}`} />
          <p>{experience.title}</p>
        </div>
      ))}
    </CustomSlider>
  );
};

export default BannerSlider;
