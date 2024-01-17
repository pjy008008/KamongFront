import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import eraser from "../img/eraser.png"

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
`;

const Blackboard = styled.div`
  width: 65vw;
  height: 100vw;
  background-color: #315c40;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 35px solid #4b3327;
  border-radius: 50px;
`;

const EraserImage = styled.img`
position: absolute;
  bottom: 18vh;
  left: 25vw;
  width: 7vw; 
`;

const Chalk1 = styled.div`
  width: 1vw;
  height: 4vw;
  background-color:white;
  position: absolute;
  bottom: 55vh;
  right: 23vw;
  border-radius: 10px;
`;
const Chalk2 = styled.div`
width: 1vw;
height: 4vw;
background-color: #F6AFAF;
position: absolute;
bottom: 55vh;
right: 21.7vw;
border-radius: 10px;
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

const GoBackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  margin-right: auto;
`;

const Exp = () => {
  const location = useLocation();
  const { expTitle, expId } = location.state || {};
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get(`http://35.216.68.47:8080/api/experiences/${expId}/pages`)
      .then((response) => {
        console.log(response.data.result);
        setSteps(response.data.result);

        // const data = response.data;
        // const sortedSteps = data.result.map((item) => ({
        //   stepId: item.stepId,
        //   sequence: item.sequence,
        // }));

        // sortedSteps.sort((a, b) => a.sequence - b.sequence);

        // console.log("Sorted Steps:", sortedSteps);

        // setSteps(sortedSteps);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const goBack = () => {
    navigate("/select");
  };
  const handleExp = (sequence) => {
    if (sequence == 0) {
      return (
        <Blackboard>
          <h2>카몽이와 함께 하는 {expTitle}</h2>
          <Button onClick={nextBtn}>체험 시작</Button>
        </Blackboard>
      );
    } else if (sequence - 1 == steps.length) {
      return (
        <Blackboard>
          <h2>this is last page</h2>
          <Button onClick={prevBtn}>이전</Button>
        </Blackboard>
      );
    } else {
      return (
        <Blackboard>
          <h2>{steps[sequence - 1].title}</h2>
          <p>{steps[sequence - 1].line}</p>
          <p>
            <img
              style={{ width: "500px", height: "300px" }}
              src={steps[sequence - 1].imageUrl}
              alt="Experience Image"
            />
          </p>
          <audio controls key={steps[sequence - 1].voiceUrl}>
            <source src={steps[sequence - 1].voiceUrl} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
          <div style={{ display: "flex" }}>
            <Button onClick={prevBtn}>이전</Button>
            <Button onClick={nextBtn}>다음</Button>
          </div>
        </Blackboard>
      );
    }
  };
  const prevBtn = () => {
    setCount((prev) => prev - 1);
  };
  const nextBtn = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <StartContainer>
      <GoBackButton onClick={goBack}>뒤로가기</GoBackButton>
      {handleExp(count)}
      <EraserImage src={eraser} />
      <Chalk1></Chalk1>
      <Chalk2></Chalk2>
    </StartContainer>
  );
};

export default Exp;
