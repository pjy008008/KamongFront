import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import eraser from "../img/eraser.png";
import pause from "../img/pause.png";
import play from "../img/play.png";
import styles from "./Exp.module.css";

const StartContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100vw;
  height: 100vh;
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
  position: relative;
  bottom: 9vh;
  right: 30vw;
  width: 7vw;
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
  position: absolute;
  background-color: transparent;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 16px;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 5px;
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
    const blackboardStyle = {
      overflow: "auto",
      overflowX: "hidden",
    };
    const lastboardStyle = {
      overflowY: "auto",
      height: "80vh",
    };
    const lastTitle = {
      marginTop: "7vh",
    };

    if (sequence === 0) {
      return (
        <Blackboard style={blackboardStyle}>
          <Title>카몽이와 함께 하는 {expTitle}</Title>
          <StartButton onClick={nextBtn}>체험 시작</StartButton>
        </Blackboard>
      );
    } else if (sequence - 1 === steps.length) {
      return (
        <Blackboard style={lastboardStyle}>
          <div style={{ height: "80vh" }}>
            <Title style={lastTitle}>{expTitle} 순서</Title>
            <div style={{ height: "30px" }}></div>
            {steps.map((item, key) => (
              <p
                style={{
                  marginTop: "0px",
                  textAlign: "left",
                  width: "30vw",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
                key={key}
                onClick={() => {
                  setCount(key + 1);
                }}
              >
                {key + 1}
                {". "}
                {item.title}
              </p>
            ))}
            <Button onClick={prevBtn}>이전</Button>
          </div>
        </Blackboard>
      );
    } else {
      if (steps[sequence - 1].isImage) {
        return (
          <Blackboard style={blackboardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "2vh",
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
            <img
              style={{
                width: "40vw",
                maxHeight: "40vh",
                overflowY: "auto",
              }}
              src={steps[sequence - 1].imageUrl}
              alt="체험 이미지"
            />

            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                width: "50vw",
                maxHeight: "20vh",
                overflowY: "auto",
              }}
            >
              {steps[sequence - 1].line}
            </p>
          </Blackboard>
        );
      } else {
        return (
          <Blackboard style={blackboardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "2vh",
              }}
            >
              <Button onClick={prevBtn}>이전</Button>
              <Button onClick={nextBtn}>다음</Button>
            </div>
            <div className={styles.youtubeContainer}>
              <iframe
                className={styles.youtubeVideo}
                src={steps[sequence - 1].videoUrl}
                allow="autoplay;"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </Blackboard>
        );
      }
    }
  };

  const prevBtn = () => {
    setCount((prev) => prev - 1);
  };
  const nextBtn = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <GoBackButton onClick={goBack}>뒤로가기</GoBackButton>
      <StartContainer>
        <div>
          {handleExp(count)}
          <EraserImage src={eraser} />
        </div>
      </StartContainer>
    </div>
  );
};

export default Exp;
