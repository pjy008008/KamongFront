import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const NavBar = styled.nav`
  // position: fixed;
  // width: 100%;
  // height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  margin: 0px;
  padding-top: 0.5vh;
  padding-bottom: 3vh;
`;
const Title = styled.h1`
  color: ${(props) => props.fontcolor};
  font-size: 25px;
  margin: 15px;
  margin-top: 15px;
  margin-left: 5vw;
  
  &:hover {
    cursor: pointer;
  }
`;
const UserIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 15px;
  margin-right: 30px;
  
  &:hover {
    cursor: pointer;
  }
`;
const LangIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 15px;
  margin-right: 5vw;
  
  &:hover {
    cursor: pointer;
  }
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
