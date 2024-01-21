import styled, { css } from "styled-components";
import { useState } from "react";
import axios from "axios";

const ToggleContainer = styled.span`
  position: relative;
  display: inline-block;
  text-align: center;
  align-items: center;
  right: 10px;
  top: 10px;
  bottom: 10px;
  width: 70px;
  height: 40px;
  border-radius: 30px;
  background-color: lightgray;
  transition: 0.5s;
  ${(props) =>
    props.checked &&
    css`
      background-color: #315c40;
      transition: 0.5s;
    `}
`;
const ToggleCircle = styled.span`
  position: absolute;
  top: 4px;
  left: 3px;
  width: 35px;
  height: 33px;
  border-radius: 50%;
  background-color: white;
  transition: 0.5s;
  ${(props) =>
    props.checked &&
    css`
      left: 31px;
      background-color: white;
      transition: 0.5s;
    `}
`;
const Toggle = ({ expId, status }) => {
  const [isOn, setisOn] = useState(status);
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn);

    const url = `http://35.216.68.47:8080/api/experiences/${expId}/status`;

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
