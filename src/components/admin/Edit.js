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
  width: 6vw;
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
  width: 6vw;
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
const Edit = () => {
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
      </AddExpContainer>
    </div>
  );
};
export default Edit;
