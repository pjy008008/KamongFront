import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = "http://35.216.68.47:8080/api/experiences";

const CustomSlider = styled(Slider)`
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100vw;
  height: ${(props) => (props.size === 1 ? "60vh" : "45vh")};
  z-index: 1;
  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
  .slick-track {
    margin-left: ${(props) =>
      props.size === 1 ? "30vw" : props.size === 2 ? "15vw" : "0"};
  }
`;

const Image = styled.img`
  width: ${(props) => (props.size === 1 ? "40vw" : "34vw")};
  height: ${(props) => (props.size === 1 ? "60vh" : "45vh")};
  filter: brightness(40%);
`;

const BannerSlider = ({ experiences, size, initialSlide }) => {
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
    <CustomSlider {...settings} size={size}>
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
          <Image
            size={size}
            src={experience.imageUrl}
            alt={`Slide ${index + 1}`}
          />
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              position: "relative",
              bottom: size === 1 ? "37vh" : "27vh",
              left: size === 1 ? "5vw" : "0",
              color: "white",
              fontSize: size === 1 ? "35px" : "25px",
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
