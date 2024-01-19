import Nav from "../Nav";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const InputContainer = styled.form`
  margin-top: 3vh;
  margin-left: 5vw;
`;
const DelBtn = styled.button`
  background-color: #e4e4e4;
  width: 10vw;
  margin-right: 1vw;
  height: 3vh;
  font-weight: bold;
  border: none;
  color: #4b3327;
`;
const StoreBtn = styled.button`
  background-color: #315c40;
  margin-right: 5vw;
  width: 10vw;
  color: white;
  height: 3vh;
  font-weight: bold;
  border: none;
`;
const Title = styled.h2`
  color: #303030;
  font-size: 20px;
  margin-right: 1vw;
`;
const TitleContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
`;
const ContextContainer = styled.div`
  margin-top: 1vh;
  width: 90vw;
  display: flex;
  align-items: top;
`;
const TimeContainer = styled.div`
  margin-top: 1vh;
  width: 90vw;
  display: flex;
  align-items: center;
`;
const VoiceContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
`;
const MakeScript = () => {
  const [title, setTitle] = useState("");
  const [line, setLine] = useState("");
  const [selectedVoiceFile, setSelectedVoiceFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [duration, setDuration] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  //script Id출력
  const params = useParams();
  const location = useLocation();
  let expId = location.state.expId;
  // let stepId = location.state.stepId;
  // console.log(stepId);
  const navigate = useNavigate();

  const handleVoiceFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedVoiceFile(file);
    }
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageFile(file);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle((prev) => value);
    } else if (name === "line") {
      setLine((prev) => value);
    } else if (name === "minute") {
      setMinute((prev) => value);
    } else if (name === "second") {
      setSecond((prev) => value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const totalDuration = 60 * parseInt(minute, 10) + parseInt(second, 10);

    // const FormData = require(`form-data`);
    const requestData = {
      title: title,
      line: line,
      duration: totalDuration,
      // sequence: stepId + 1,
    };

    // FormData 인스턴스를 생성하고 요청 데이터를 추가합니다.
    const formData = new FormData();
    formData.append("request", JSON.stringify(requestData));
    formData.append("image", selectedImageFile, {
      filename: selectedImageFile.name,
      contentType: "image/jpeg",
    });
    formData.append("voice", selectedVoiceFile, {
      filename: selectedVoiceFile.name,
      contentType: "audio/mpeg",
    });

    // POST 요청을 보냅니다.
    axios
      .post(
        `http://35.216.68.47:8080/api/experiences/${expId}/pages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Content-Type 헤더 설정
            accept: "*/*",
          },
        }
      )
      .then((response) => {
        // 성공적인 응답 처리
        console.log("응답 데이터:", response.data);
        navigate(`/exp/${expId}`);
        alert("생성완료");
      })
      .catch((error) => {
        // 에러 처리
        console.error("에러:", error);
      });
  };

  useEffect(() => {
    // duration 값이 변경될 때마다 minute 및 second를 업데이트
    setSecond(duration % 60);
    setMinute(Math.floor(duration / 60));
  }, [duration]);
  return (
    <div>
      <Nav bgcolor={"white"} fontcolor={"#315C40"} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => navigate(`/exp/${expId}`)}
          style={{ border: "none", marginLeft: "5vw" }}
        >
          뒤로가기
        </button>
        <div>
          {/* <DelBtn onClick={handleDel}>삭제</DelBtn> */}
          <StoreBtn type="submit" form="form">
            저장
          </StoreBtn>
        </div>
      </div>
      <InputContainer onSubmit={onSubmit} id="form">
        <TitleContainer>
          <Title>제목</Title>
          <input
            style={{
              backgroundColor: "#DDDDDD",
              border: "none",
              width: "80vw",
              height: "5vh",
              paddingLeft: "20px",
            }}
            onChange={onChange}
            value={title}
            name="title"
            type="text"
            placeholder="제목을 입력하세요"
          />
        </TitleContainer>
        <ContextContainer>
          <Title>대사</Title>
          <input
            style={{
              backgroundColor: "#DDDDDD",
              border: "none",
              width: "80vw",
              height: "23vh",
              paddingLeft: "20px",
            }}
            onChange={onChange}
            name="line"
            value={line}
            type="text"
            placeholder="대사를 입력하세요"
          />
        </ContextContainer>
        <TimeContainer>
          <Title>시간</Title>
          <input
            style={{
              backgroundColor: "#DDDDDD",
              border: "none",
              width: "10vw",
              height: "5vh",
              paddingLeft: "20px",
            }}
            onChange={onChange}
            value={minute}
            name="minute"
            type="number"
            placeholder="분"
          />
          <input
            style={{
              backgroundColor: "#DDDDDD",
              marginLeft: "1vw",
              border: "none",
              width: "10vw",
              height: "5vh",
              paddingLeft: "20px",
            }}
            max="60"
            onChange={onChange}
            value={second}
            name="second"
            type="number"
            placeholder="초"
          />
        </TimeContainer>
        <VoiceContainer>
          <Title>음성</Title>
          <label htmlFor="voiceFile">
            {selectedVoiceFile ? (
              <div
                style={{
                  border: "1px solid black",
                  width: "250px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                Selected file: {selectedVoiceFile.name}
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid black",
                  width: "250px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                파일에서 불러오기(mp3)
              </div>
            )}
          </label>
          <input
            id="voiceFile"
            name="voiceFile"
            type="file"
            accept="audio/*"
            style={{ display: "none" }}
            onChange={handleVoiceFileChange}
          />
        </VoiceContainer>
        <VoiceContainer>
          <Title>이미지</Title>
          <label htmlFor="imageFile">
            {selectedImageFile ? (
              <div
                style={{
                  border: "1px solid black",
                  width: "250px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                Selected file: {selectedImageFile.name}
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid black",
                  width: "250px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                파일에서 불러오기
              </div>
            )}
          </label>
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageFileChange}
          />
        </VoiceContainer>
      </InputContainer>
    </div>
  );
};
export default MakeScript;
