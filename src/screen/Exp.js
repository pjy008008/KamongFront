import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import eraser from "../img/eraser.png";
import pause from "../img/pause.png";
import play from "../img/play.png";

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Blackboard = styled.div`
  width: 80vw;
  height: 80vh;
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
  bottom: 10vh;
  left: 20vw;
  width: 7vw;
`;

const Chalk1 = styled.div`
  width: 1vw;
  height: 4vw;
  background-color: white;
  position: absolute;
  bottom: 55vh;
  right: 23vw;
  border-radius: 10px;
`;
const Chalk2 = styled.div`
  width: 1vw;
  height: 4vw;
  background-color: #f6afaf;
  position: absolute;
  bottom: 55vh;
  right: 21.7vw;
  border-radius: 10px;
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 2vw;
  margin-right: 0.8vw;
  border-radius: 10px;
`;

const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 30px;
  font-weight: bold;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 2vw;
  margin-right: 0.8vw;
  border-radius: 10px;
`;

const GoBackButton = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  font-size: 16px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  margin-right: auto;
  margin-left: 1vw;
`;

const Title = styled.h2`
  color: white;
  font-weight: bold;
  font-size: 40px;
  margin: 0px;
`;

const CustomButton = styled.button`
  padding: 0; /* padding을 0으로 설정하여 내부 여백을 없앱니다. */
  border: none; /* 테두리를 없앱니다. */
  background: none; /* 배경을 없앱니다. */
  cursor: pointer;
  position: relative;
  margin-top: 1vw;
  margin-left: 2vw;
  margin-right: 2vw; /* 오른쪽 여백을 추가하여 다음 버튼과의 간격을 조절합니다. */
`;

const IconImg = styled.img`
  width: 30px; /* 이미지의 크기에 맞게 조절하세요 */
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0.5vw;
`;

const Exp = () => {
  const location = useLocation();
  const { expTitle, expId } = location.state || {};
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [count, setCount] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState(null); // 상태 추가
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 추가

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

  const toggleAudio = (url) => {
    if (audioPlayer && isPlaying) {
      audioPlayer.pause(); // 재생 중인 오디오를 멈춤
      setIsPlaying(false); // 재생 상태 업데이트
    } else {
      const audio = new Audio(url);
      audio.play(); // 오디오 재생
      setAudioPlayer(audio); // 오디오 플레이어 설정
      setIsPlaying(true); // 재생 상태 업데이트
    }
  };

  const handleExp = (sequence) => {
    if (sequence == 0) {
      return (
        <Blackboard>
          <Title>카몽이와 함께 하는 {expTitle}</Title>
          <StartButton onClick={nextBtn}>체험 시작</StartButton>
        </Blackboard>
      );
    } else if (sequence - 1 == steps.length) {
      return (
        <Blackboard>
          <Title>[{expTitle} 순서]</Title>
          {steps.map((item, key) => (
            <Title
              style={{}}
              onClick={() => {
                setCount(key + 1);
              }}
            >
              {key + 1}
              {". "}
              {item.title}
            </Title>
          ))}
          <Button onClick={prevBtn}>이전</Button>
        </Blackboard>
      );
    } else {
      return (
        <Blackboard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "2vw",
            }}
          >
            <Button onClick={prevBtn}>이전</Button>
            <CustomButton
              onClick={() => toggleAudio(steps[sequence - 1].voiceUrl)}
            >
              <IconImg
                src={isPlaying ? pause : play}
                alt={isPlaying ? "멈춤" : "재생"}
              />
            </CustomButton>
            <Button onClick={nextBtn}>다음</Button>
          </div>

          <Title>{steps[sequence - 1].title}</Title>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            {steps[sequence - 1].line}
          </p>
          <p>
            <img
              style={{ width: "900px", height: "480px" }}
              src={steps[sequence - 1].imageUrl}
              alt="Experience Image"
            />
          </p>
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
    </StartContainer>
  );
};

export default Exp;
