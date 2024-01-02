import Nav from "../Nav";
import styled from "styled-components";
import { useState } from "react";

const InputContainer = styled.div`
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
`;
const TitleContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
`;
const ContextContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
`;
const TimeContainer = styled.div`
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
        <button>뒤로가기</button>
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
              height: "8vh",
            }}
            placeholder="제목을 입력하세요"
          />
        </TitleContainer>
        <ContextContainer>
          <Title>대사</Title>
          <input placeholder="대사를 입력하세요" />
        </ContextContainer>
        <TimeContainer>
          <Title>시간</Title>
          <input placeholder="시간을 입력하세요->추후 수정예정" />
        </TimeContainer>
        <VoiceContainer>
          <Title>음성</Title>
          <label for="file">
            {selectedFile ? (
              <div>Selected file: {selectedFile.name}</div>
            ) : (
              <div>이미지 불러오기</div>
            )}
          </label>
          <input
            id="file"
            name="file"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </VoiceContainer>
      </InputContainer>
    </div>
  );
};
export default Script;
