import styled from "styled-components";
import Nav from "../Nav";
import coffee from "../../img/coffee.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #315c40;
`;
const Image = styled.img`
  /* 상하좌우 정중앙 정렬하기 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 80vh;
`;
const BackImage = styled.div`
  /* 상하좌우 정중앙 정렬하기 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 80vh;
  background-color: #282828;
  opacity: 75%;
`;
const TitleContainer = styled.div`
  /* 상하좌우 정중앙 정렬하기 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80vw;
  height: 20vh;
  text-align: right;
  opacity: 100%;
  border-right: 5px solid white;
  padding-right: 100px;
`;
const Title = styled.h1`
  color: white;
  font-size: 70px;
`;
const SubTitle = styled.h2`
  font-size: 40px;
  color: white;
`;
const PreStart = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/select");
  };
  return (
    <div>
      <Background>
        <Nav />
        <Image src={coffee} />
        <BackImage></BackImage>
        <TitleContainer>
          <SubTitle>카몽이와 함께하는 초콜릿 체험</SubTitle>
          <Title onClick={onClick}>시작하기</Title>
        </TitleContainer>
      </Background>
    </div>
  );
};
export default PreStart;
