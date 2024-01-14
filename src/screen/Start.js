import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
`;

const Blackboard = styled.div`
  width: 80%;
  height: 100%;
  background-color: #315c40;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StartButton = styled.button`
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

const Start = () => {
  const location = useLocation();
  const { expTitle, expId } = location.state || {};
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    axios
      .get(`http://35.216.68.47:8080/api/experiences/${expId}/pages`)
      .then((response) => {
        const data = response.data;

        const sortedSteps = data.result.map((item) => ({
          stepId: item.stepId,
          sequence: item.sequence,
        }));

        sortedSteps.sort((a, b) => a.sequence - b.sequence);

        console.log("Sorted Steps:", sortedSteps);

        setSteps(sortedSteps);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const goBack = () => {
    navigate("/select");
  };

  const startExperience = () => {
    const currentStepIndex = steps.length > 0 ? 0 : -1;
    navigate(`/startexp/${steps[currentStepIndex].stepId}`, { state: { steps, expId, expTitle, previeoulyStepIndex: currentStepIndex } });
  };

  return (
    <StartContainer>
      <GoBackButton onClick={goBack}>뒤로가기</GoBackButton>
      <Blackboard>
        <h2>카몽이와 함께 하는 {expTitle}</h2>
        <StartButton onClick={startExperience}>체험 시작</StartButton>
      </Blackboard>
    </StartContainer>
  );
};

export default Start;