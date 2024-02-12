import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = "http://35.216.68.47:8080/api/experiences";

// const CustomSlider = styled(Slider)`
//   overflow-y: hidden;
//   overflow-x: hidden;
//   width: 100vw;
//   height: ${(props) => (props.size === 1 ? "60vh" : "45vh")};
//   z-index: 1;
//   .slick-prev {
//     left: 3% !important;
//     z-index: 1;
//   }
//   .slick-next {
//     right: 3% !important;
//     z-index: 1;
//   }
//   .slick-track {
//     margin-left: ${(props) =>
//       props.size === 1 ? "30vw" : props.size === 2 ? "15vw" : "0"};
//   }
// `;

const ExpContainer = styled.div`
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  border-radius: 30px;
`;
const Image = styled.img`
  width: 30vw;
  height: 40vh;
  filter: brightness(60%);
  border-radius: 30px;
  object-fit: cover; 
`;
const CenteredText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  position: relative;
  width: 30vw;
  height: 8vh;
  bottom: 15vh;
  left: 0;
  color: white;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 1199px) {
    font-size: 25px;
  }

  @media screen and (max-width: 899px) {
    font-size: 3vw;
  }
`;

const BannerSlider = ({ experiences, size }) => {
  const navigate = useNavigate();

  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   initialSlide: initialSlide,
  // };

  return (
    <div
      style={{
        width: "95vw",
        overflowX: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        margin: "0 auto",
      }}
    >
      {experiences.map((experience, index) => (
        <div style={{ margin: "0 auto", width: "30vw" }}>
          <ExpContainer
            style={{ height: "40vh", width: "30vw", marginBottom: "5vh" }}
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
            <CenteredText>
              {experience.title}
            </CenteredText>
          </ExpContainer>
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
