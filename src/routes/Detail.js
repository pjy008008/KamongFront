import styled from "styled-components";
import Nav from "../components/Nav";
import List from "../components/admin/List";
const TopContainer = styled.div`
  margin-top: 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  color: #4b3327;
  font-size: 30px;
  font-weight: bold;
  margin: 0px;
  margin-left: 5vw;
`;
const ScriptBtn = styled.button`
  background-color: #315c40;
  width: 10vw;
  margin-right: 1vw;
  height: 3vh;
  color: white;
  font-weight: bold;
  border: none;
`;
const Newbtn = styled.button`
  background-color: #e4e4e4;
  color: #4b3327;
  margin-right: 5vw;
  width: 10vw;
  height: 3vh;
  font-weight: bold;
  border: none;
`;
const Container = styled.div``;
const Detail = () => {
  return (
    <div>
      <Nav bgcolor={"white"} fontcolor={"#315C40"}></Nav>
      <TopContainer>
        <Title>몰드초콜릿</Title>
        <div>
          <ScriptBtn>대사 전체보기</ScriptBtn>
          <Newbtn>+새 페이지</Newbtn>
        </div>
      </TopContainer>
      <List />
    </div>
  );
};

export default Detail;
