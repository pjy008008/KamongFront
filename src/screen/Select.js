import Nav from "../components/Nav";
import Slide from "../components/select/Slide";
import styled from "styled-components";
import first from "../img/1.jpg";
import second from "../img/2.jpg";
import third from "../img/3.jpg";

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: #4b3327;
`;
const Select = () => {
  const images1 = [first, second, third, first, second, third];
  const images2 = [third, first, second, third, first, second];
  // 모든 체험 받아오는 코드
  return (
    <div>
      <Nav bgcolor={"white"} fontcolor={"#315C40"} />
      {/* api 호출 후 메뉴 호출하는 함수 구현 */}
      <Title>체험목록</Title>
      <Slide images={images1} />
      <Slide images={images2} />
    </div>
  );
};
export default Select;
