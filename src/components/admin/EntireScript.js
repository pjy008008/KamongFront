import styled from "styled-components";

const Container = styled.div`
  width: 90vw;
  height: 80vh;
  margin: 0 auto;
  margin-top: 20px;
  padding-top: 5px;
  background-color: #e4e4e4;
  overflow-y: scroll;
`;
const ContentContainer = styled.div`
  margin-top: 3vh;
  margin-left: 3vw;
`;
const Title = styled.p`
  font-weight: bold;
  margin: 0px;
`;
const Line = styled.p`
  margin: 0px;
`;
const EntireScript = ({ exp }) => {
  return (
    <div>
      <Container>
        {exp.map((item, key) => (
          <ContentContainer key={key}>
            <Title>{`#${item.title}`}</Title>
            <Line>{item.line}</Line>
          </ContentContainer>
        ))}
      </Container>
    </div>
  );
};
export default EntireScript;
