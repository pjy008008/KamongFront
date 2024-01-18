import Nav from "../components/Nav";
import Slide from "../components/select/Slide";
import styled from "styled-components";
import first from "../img/1.jpg";
import second from "../img/2.jpg";
import third from "../img/3.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: #4b3327;
  margin: 0px;
  margin-bottom: 30px;
  margin-top: 5vh;
`;

const API_ENDPOINT = "http://35.216.68.47:8080/api/experiences";

const Select = () => {
  const [experiences, setExperiences] = useState([]);
  // const [contentArray1, setContentArray1] = useState([]);
  // const [contentArray2, setContentArray2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Accept: "*/*",
          },
        });
        const contentArray = response.data.result.content;
        setExperiences(contentArray);
        // const middleIndex = Math.ceil(contentArray.length / 2);
        // const newArray1 = contentArray.slice(0, middleIndex);
        // const newArray2 = contentArray.slice(middleIndex);
        // setContentArray1(newArray1);
        // setContentArray2(newArray2);
      } catch (error) {
        console.error("에러:", error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Nav bgcolor={"white"} fontcolor={"#315C40"} />
      {/* api 호출 후 메뉴 호출하는 함수 구현 */}
      <Title>체험목록</Title>
      <Slide experiences={experiences} />
      <Slide experiences={experiences} />
    </div>
  );
};
export default Select;
