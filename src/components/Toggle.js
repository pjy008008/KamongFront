import styled, { css } from "styled-components";
import { useState } from "react";
import axios from "axios";

const ToggleContainer = styled.span`
  position: relative;
  display: inline-block;
  text-align: center;
  align-items: center;
  right: 1vw;
  width: 5vw;
  height: 5vh;
  border-radius: 30px;
  background-color: lightgray;
  transition: 0.5s;
  ${(props) =>
    props.checked &&
    css`
      background-color: #315c40;
      transition: 0.5s;
    `}

    @media screen and (max-width:1199px) {
      width: 6.5vw;
    }
  
    @media screen and (max-width:899px) {
      width: 9vw;
    }  
`;
const ToggleCircle = styled.span`
  position: absolute;
  left: 0px;
  width: 2.2vw;
  height: 5vh;
  border-radius: 50%;
  background-color: white;
  transition: 0.5s;
  ${(props) =>
    props.checked &&
    css`
      left: 2.8vw;
      background-color: white;
      transition: 0.5s;

      @media screen and (max-width:1199px) {
        left: 3vw;
      }

      @media screen and (max-width:899px) {
        left: 4vw;
      }  
    `}

    @media screen and (max-width:1199px) {
      width: 3.5vw;
    }
  
    @media screen and (max-width:899px) {
      width: 5vw;
    }  
`;

const Toggle = ({ expId, status }) => {
  const [isOn, setisOn] = useState(status);
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn);

    const url = `https://camong.p-e.kr/api/experiences/${expId}/status`;

    axios
      .patch(url, null, {
        headers: {
          Accept: "*/*",
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <ToggleContainer checked={isOn}>
        <ToggleCircle onClick={toggleHandler} checked={isOn}></ToggleCircle>
      </ToggleContainer>
    </>
  );
};
export default Toggle;
