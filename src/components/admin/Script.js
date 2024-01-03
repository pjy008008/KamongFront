import Nav from "../Nav";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const Script = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [line, setLine] = useState("");
  const [duration, setDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [voiceUrl, setVoiceUrl] = useState("");
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  //script Id출력
  const params = useParams();
  // console.log(params);
  const navigate = useNavigate();

  const handleDel = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://35.216.68.47:8080/api/experiences/pages/${params.scriptId}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );
      console.log("Deletion successful:", response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    navigate(-1);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
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
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        title: title,
        line: line,
        duration: totalDuration,
      })
    );
    formData.append("image", ""); // 이미지는 비어있는 문자열로 추가
    formData.append("voice", ""); // 음성도 비어있는 문자열로 추가

    // PATCH 요청 보내기
    axios
      .patch(
        `http://35.216.68.47:8080/api/experiences/pages/${params.scriptId}`,
        formData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        // 성공 핸들링
        console.log(response.data);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://35.216.68.47:8080/api/experiences/pages/${params.scriptId}`)
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        setTitle(response.data.result.title);
        setLine(response.data.result.line);
        setDuration(response.data.result.duration);
        setImageUrl(response.data.result.imageUrl);
        setVoiceUrl(response.data.result.voiceUrl);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  }, []);

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
          onClick={() => navigate(-1)}
          style={{ border: "none", marginLeft: "5vw" }}
        >
          뒤로가기
        </button>
        <div>
          <DelBtn onClick={handleDel}>삭제</DelBtn>
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
          <label htmlFor="file">
            {selectedFile ? (
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
                Selected file: {selectedFile.name}
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
            id="file"
            name="file"
            type="file"
            accept="audio/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </VoiceContainer>
      </InputContainer>
    </div>
  );
};
export default Script;
