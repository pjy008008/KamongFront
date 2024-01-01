import Nav from "../Nav";
import styled from "styled-components";
import { useState } from "react";

const InputContainer = styled.div``;
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
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ContextContainer = styled.div`
  display: flex;
  align-items: center;
`;
const TimeContainer = styled.div`
  display: flex;
  align-items: center;
`;
const VoiceContainer = styled.div`
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
          <h2>제목</h2>
          <input placeholder="제목을 입력하세요" />
        </TitleContainer>
        <ContextContainer>
          <h2>대사</h2>
          <input placeholder="대사를 입력하세요" />
        </ContextContainer>
        <TimeContainer>
          <h2>시간</h2>
          <input placeholder="시간을 입력하세요->추후 수정예정" />
        </TimeContainer>
        <VoiceContainer>
          <h2>음성</h2>
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
