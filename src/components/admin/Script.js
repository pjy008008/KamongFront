import Nav from "../Nav";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InputContainer = styled.div`
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
  
  //script Id출력
  const params = useParams();
  console.log(params);

  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
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
          <DelBtn>삭제</DelBtn>
          <StoreBtn>저장</StoreBtn>
        </div>
      </div>
      <InputContainer>
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
