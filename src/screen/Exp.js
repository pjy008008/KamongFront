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
  font-size: 70px;
  margin: 0px;
  font-family: "Gothic_Goding", sans-serif;
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
  const [listToggle, setListToggle] = useState(false);

  // 페이지 이동 시 cleanup 함수를 활용하여 이전 페이지의 음성 정지
  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        setIsPlaying(false);
      }
    };

  }, [audioPlayer]);

  useEffect(() => {
    if (audioPlayer && isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
    }
    if (steps[count-1] && steps[count-1].voiceUrl) {
      const audio = new Audio(steps[count-1].voiceUrl);
      audio.play();
      setAudioPlayer(audio);
      setIsPlaying(true);
    }
  }, [count]);
  
  const CountdownTimer = ({ initialDuration, onTimerEnd }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(initialDuration);
    const [prevDuration, setPrevDuration] = useState(initialDuration);

    useEffect(() => {
      // 초기화 및 이전 값 업데이트
      if (prevDuration !== initialDuration) {
        setRemainingSeconds(initialDuration);
        setPrevDuration(initialDuration);
      }

      // setInterval을 이용한 타이머 설정
      const timer = setInterval(() => {
        setRemainingSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(timer); // 타이머 정리
            if (onTimerEnd && typeof onTimerEnd === "function") {
              onTimerEnd(); // 타이머 종료 시 특정 함수 실행
            }
            return 0;
          }
        });
      }, 1000);

      // 컴포넌트가 언마운트되거나 initialDuration이 변경되면 clearInterval 호출
      return () => clearInterval(timer);
    }, [initialDuration, prevDuration]);

    // 남은 시간을 포맷하여 표시
    const formatDuration = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    };

    return (
      <p
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "2vh",
          top: "10vh",
          left: "12vw",
          zIndex: "1",
        }}
      >
        {formatDuration(remainingSeconds)}
      </p>
    );
  };
  const handleTimerEnd = () => {
    console.log("Timer ended! Perform some action.");
    nextBtn();
  };

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

  
  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        setIsPlaying(false);
      }
    };
  }, [audioPlayer]);

  const toggleAudio = (url) => {
    // 현재 재생 중인 오디오가 있을 경우 정지
    if (audioPlayer && isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
      setAudioPlayer(null); // 초기화
    } else {
      // 새로운 오디오 재생
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        audio.play();
        setAudioPlayer(audio);
        setIsPlaying(true);
      });
    }
  };

  const handleExp = (sequence) => {
    const blackboardStyle = {
      overflow: "auto",
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
        //이미지 슬라이드
        return (
          <Blackboard style={blackboardStyle}>
            {/* 재생 버튼 */}
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "2vh",
                top: "8vh",
                right: "12vw",
                zIndex: "1",
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
            <div
              style={{ display: "flex", width: "80vw", alignItems: "center" }}
            >
              <div style={{ width: "30vw", marginLeft: "5vw" }}>
                <Title>{steps[sequence - 1].title}</Title>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "35px",
                    width: "30vw",
                    maxHeight: "20vh",
                    fontFamily: "Gothic_Goding",
                  }}
                >
                  {steps[sequence - 1].line}
                </p>
              </div>

              <img
                style={{
                  width: "30vw",
                  marginTop: "5vh",
                  marginLeft: "7vw",
                  maxHeight: "65vh",
                  overflowY: "auto",
                }}
                src={steps[sequence - 1].imageUrl}
                alt="체험 이미지"
              />
            </div>
            <CountdownTimer
              initialDuration={steps[sequence - 1].duration}
              onTimerEnd={handleTimerEnd}
            />
          </Blackboard>
        );
      } else {
        //영상 슬라이드
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
                title="설명 영상"
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
    // 이전 페이지로 이동할 때 이전 페이지의 음성을 정지
    if (audioPlayer) {
      audioPlayer.pause();
      setIsPlaying(false);
      setAudioPlayer(null); // 초기화
    }
    // 페이지 이동
    setCount((prev) => prev - 1);
  };

  const nextBtn = () => {
    // 다음 페이지로 이동할 때 이전 페이지의 음성을 정지
    if (audioPlayer) {
      audioPlayer.pause();
      setIsPlaying(false);
      setAudioPlayer(null); // 초기화
    }
    // 페이지 이동
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <GoBackButton onClick={goBack}>뒤로가기</GoBackButton>
      <span
        onClick={() => setListToggle((prev) => !prev)}
        style={{ position: "absolute", right: "2vw", top: "2vh" }}
      >
        목록
      </span>
      {listToggle ? (
        <div
          style={{
            zIndex: "2",
            width: "30vw",
            height: "100vh",
            position: "absolute",
            right: "0vw",
            top: "0vh",
            backgroundColor: "#000000",
            color: "white",
            opacity: "80%",
          }}
        >
          <span
            onClick={() => setListToggle((prev) => !prev)}
            style={{ position: "absolute", right: "2vw", top: "2vh" }}
          >
            목록
          </span>
          <div
            style={{
              maxHeight: "100vh",
              height: "100vh",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <div style={{ height: "8vh" }}></div>
            {steps.map((item, key) => (
              <div
                onClick={() => setCount(key + 1)}
                style={{
                  position: "relative",
                  width: "25vw",
                  height: "15vh",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginBottom: "10px",
                  marginLeft: "2vw",
                }}
              >
                <p
                  style={{
                    marginTop: "0px",
                    textAlign: "left",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "25px",
                    paddingLeft: "10px",
                  }}
                  key={key}
                  onClick={() => {
                    setCount(key + 1);
                  }}
                >
                  {"#"}
                  {key + 1} {item.title}
                </p>
                <p
                  style={{
                    marginTop: "0px",
                    textAlign: "left",
                    color: "black",
                    fontSize: "13px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  {item.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
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
