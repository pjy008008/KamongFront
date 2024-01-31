import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_ENDPOINT = "http://35.216.68.47:8080/api/experiences";

const CustomSlider = styled(Slider)`
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100vw;
  height: 45vh;
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
  width: 34vw;
  height: 45vh;
  filter: brightness(40%);
`;

const BannerSlider = ({ experiences, initialSlide }) => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: initialSlide,
  };

  return (
    <CustomSlider {...settings}>
      {experiences.map((experience, index) => (
        <div
          key={index}
          onClick={() =>
            navigate(`/exp`, {
              state: {
                expTitle: experience.title,
                expId: experience.experienceId,
              },
            })
          }
        >
          <Image src={experience.imageUrl} alt={`Slide ${index + 1}`}></Image>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              position: "relative",
              bottom: "27vh",
              color: "white",
              fontSize: "20px",
            }}
          >
            {experience.title}
          </p>
        </div>
      ))}
    </CustomSlider>
  );
};

export default BannerSlider;
