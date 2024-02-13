import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import camong from "../img/camong.png";
import eraser from "../img/eraser.png";
import pause from "../img/pause.png";
import play from "../img/play.png";
import styles from "./Exp.module.css";

const StartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Blackboard = styled.div`
  margin-top: 5vh;
  width: 80vw;
  height: 75vh;
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

const CamongContainer = styled.div`
  position: fixed;
  bottom: -1vw;
  left: 0vw;
  width: 10vw;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 4vh;
  margin-right: 0.8vw;
  border-radius: 10px;
`;

const UrlButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  margin-right: 0.8vw;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2vh;
`;

const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 30px;
  font-weight: bold;
  background-color: white;
  color: #4b3327;
  border: none;
  cursor: pointer;
  margin-top: 5vh;
  margin-right: 0.8vw;
  border-radius: 30px;
  width: 250px;
  height: 80px;
  z-index: 1;

  @media screen and (max-width: 1199px) {
    width: 25vw;
    font-size: 3vw;
  }

  @media screen and (max-width: 899px) {
    width: 30vw;
    font-size: 4vw;
  }
`;

const GoBackButton = styled.button`
  position: absolute;
  background-color: #315c40;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
`;

const Title = styled.h2`
  color: white;
  font-weight: bold;
  font-size: 70px;
  margin: 0px;
  font-family: "Gothic_Goding", sans-serif;
  z-index: 1;

  @media screen and (max-width: 1199px) {
    font-size: 6vw;
  }

  @media screen and (max-width: 899px) {
    width: 65vw;
    font-size: 10vw;
  }
`;

const CustomButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  margin-top: 2.7vh;
  margin-left: 2vw;
  margin-right: 2.5vw;
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
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listToggle, setListToggle] = useState(false);

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
    if (steps[count - 1] && steps[count - 1].voiceUrl) {
      const audio = new Audio(steps[count - 1].voiceUrl);
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
          if (isPlaying === true) {
            if (prevSeconds > 0) {
              return prevSeconds - 1;
            } else {
              clearInterval(timer); // 타이머 정리
              if (onTimerEnd && typeof onTimerEnd === "function") {
                onTimerEnd(); // 타이머 종료 시 특정 함수 실행
              }
              return 0;
            }
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
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    };

    return null;
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
      audio.addEventListener("loadedmetadata", () => {
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
      height: "72vh",
    };
    const lastTitle = {
      marginTop: "7vh",
    };

    if (sequence === 0) {
      return (
        <Blackboard style={blackboardStyle}>
          <Title>카몽이와 함께 하는 {expTitle}</Title>
          <StartButton onClick={nextBtn}>체험 시작</StartButton>
          <CamongContainer>
            <img src={camong} style={{ width: "530px", height: "400px" }} />
          </CamongContainer>
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
              <ButtonContainer>
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
              </ButtonContainer>
            </div>
            <div
              style={{ display: "flex", width: "80vw", alignItems: "center" }}
            >
              <div style={{ width: "30vw", marginLeft: "5vw" }}>
                <Title style={{ whiteSpace: "pre-wrap" }}>{steps[sequence - 1].title}</Title>
                <p
                  style={{
                    whiteSpace: "pre-wrap",
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
              <UrlButton onClick={prevBtn}>이전</UrlButton>
              <UrlButton onClick={nextBtn}>다음</UrlButton>
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
    if (audioPlayer) {
      audioPlayer.pause();
      setIsPlaying(false);
      setAudioPlayer(null);
    }
    setCount((prev) => prev - 1);
  };

  const nextBtn = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setIsPlaying(false);
      setAudioPlayer(null);
    }
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <GoBackButton onClick={goBack}>뒤로가기</GoBackButton>
      <GoBackButton
        onClick={() => setListToggle((prev) => !prev)}
        style={{ right: "10px" }}
      >
        목록
      </GoBackButton>
      {listToggle ? (
        <div
          style={{
            zIndex: "2",
            width: "45vw",
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
            style={{
              position: "absolute",
              right: "2vw",
              top: "2vh",
              fontWeight: "bold",
            }}
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
            <div style={{ height: "8vh", width: "40vw" }}></div>
            {steps.map((item, key) => (
              <div
                onClick={() => {
                  if (audioPlayer) {
                    audioPlayer.pause();
                    setIsPlaying(false);
                    setAudioPlayer(null);
                  }
                  setListToggle(false); // 목록을 닫습니다.
                  setCount(key + 1);
                }}
                style={{
                  position: "relative",
                  width: "40vw",
                  paddingBottom: "2px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginBottom: "10px",
                  marginLeft: "2vw",
                }}
                key={key}
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
