import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  margin: 0px;
  padding-top: 1vh;
  padding-bottom: 3vh;
`;
const Title = styled.h1`
  color: ${(props) => props.fontcolor};
  font-size: 45px;
  margin: 0px;
  margin-top: 20px;
  margin-left: 30px;
`;
const UserIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 20px;
  margin-right: 30px;
`;
const LangIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 20px;
  margin-right: 50px;
`;

const Nav = ({ bgcolor, fontcolor }) => {
  const navigate = useNavigate();
  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleMain = () => {
    navigate("/");
  };
  return (
    <div>
      <NavBar bgcolor={bgcolor}>
        <Title fontcolor={fontcolor} onClick={handleMain}>
          BONJUNG
        </Title>
        <div>
          <UserIcon fontcolor={fontcolor} onClick={handleAdmin}>
            Admin
          </UserIcon>
          <LangIcon fontcolor={fontcolor}>language</LangIcon>
        </div>
      </NavBar>
    </div>
  );
};
export default Nav;
