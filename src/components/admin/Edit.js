import { useState } from "react";
import Nav from "../Nav";
import styled from "styled-components";

const ExpContainer = styled.div`
  width: 80vw;
  height: 40vh;
  margin-top: 2vh;
  margin-left: 10vw;
  border-radius: 20px;
  background-color: #315c40;
  padding-top: 3vh;
`;
const Exp = styled.div`
  width: 70vw;
  height: 7vh;
  margin-left: 5vw;

  margin-top: 1vh;
  background-color: #e4e4e4;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
const ExpTitle = styled.h2`
  color: #303030;
  margin: 0px;
  font-weight: bold;
  font-size: 30px;
  padding-left: 3vw;
`;
const EditBtn = styled.button`
  background-color: #4b3327;
  font-weight: bold;
  font-size: 20px;
  border: none;
  color: white;
  width: 5vw;
  height: 5vh;
  border-radius: 20px;
  margin-right: 10px;
`;
const DelBtn = styled.button`
  background-color: #4b3327;
  font-weight: bold;
  font-size: 20px;
  border: none;
  color: white;
  width: 5vw;
  height: 5vh;
  border-radius: 20px;
  margin-right: 30px;
`;
const AddExpContainer = styled.div`
  margin-top: 3vh;
  width: 80vw;
  height: 30vh;
  margin-left: 10vw;
  border-radius: 20px;
  background-color: #d8d8d8;
`;
const AddExpTitle = styled.input`
  width: 50vw;
  height: 4vh;
  border: none;
  margin-bottom: 2vh;
`;
const AddExpImage = styled.div`
  width: 50vw;
  height: 4vh;
  background-color: white;
`;
const AddBtn = styled.button``;


const Edit = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <div>
      <Nav fontColor={"#315C40"} />
      <ExpContainer>
        <Exp>
          <ExpTitle>몰드 초콜릿</ExpTitle>
          <div>
            <EditBtn>편집</EditBtn>
            <DelBtn>삭제</DelBtn>
          </div>
        </Exp>
        <Exp>
          <ExpTitle>빼빼로 만들기</ExpTitle>
          <div>
            <EditBtn>편집</EditBtn>
            <DelBtn>삭제</DelBtn>
          </div>
        </Exp>
      </ExpContainer>
      <AddExpContainer>
        <h1
          style={{
            fontSize: "40px",
            color: "#315C40",
            paddingLeft: "2vw",
            paddingTop: "2vh",
          }}
        >
          체험
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div>
              <span style={{ color: "#4B3327", fontWeight: "bold" }}>
                체험명
              </span>
              <AddExpTitle></AddExpTitle>
            </div>
            <div style={{ display: "flex" }}>
              <span style={{ color: "#4B3327", fontWeight: "bold" }}>
                이미지
              </span>
              <label for="file">
                {selectedFile ? (
                  <AddExpImage>Selected file: {selectedFile.name}</AddExpImage>
                ) : (
                  <AddExpImage>이미지 불러오기</AddExpImage>
                )}
              </label>
              <input
                style={{ display: "none" }}
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <AddBtn>체험 추가</AddBtn>
        </div>
      </AddExpContainer>
    </div>
  );
};
export default Edit;
