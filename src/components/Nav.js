import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  margin: 0px;
  padding-top: 1vh;
  padding-bottom: 3vh;
`;
const Title = styled.h1`
  color: ${(props) => props.fontColor};
  font-size: 45px;
  margin: 0px;
  margin-top: 20px;
  margin-left: 30px;
`;
const UserIcon = styled.span`
  color: ${(props) => props.fontColor};
  font-size: 20px;
  margin-right: 30px;
`;
const LangIcon = styled.span`
  color: ${(props) => props.fontColor};
  font-size: 20px;
  margin-right: 50px;
`;

const Nav = ({ bgColor, fontColor }) => {
  const navigate = useNavigate();
  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleMain = () => {
    navigate("/");
  };
  return (
    <div>
      <NavBar bgColor={bgColor}>
        <Title fontColor={fontColor} onClick={handleMain}>
          BONJUNG
        </Title>
        <div>
          <UserIcon fontColor={fontColor} onClick={handleAdmin}>
            Admin
          </UserIcon>
          <LangIcon fontColor={fontColor}>language</LangIcon>
        </div>
      </NavBar>
    </div>
  );
};
export default Nav;
