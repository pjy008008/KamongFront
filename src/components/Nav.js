import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const NavBar = styled.nav`
  // position: fixed;
  // width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  margin: 0px;
  padding-top: 0.5vh;
`;
const Title = styled.h1`
  color: ${(props) => props.fontcolor};
  font-size: 32px;
  margin: 15px;
  margin-top: 1vh;
  margin-left: 5vw;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1050px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
const UserIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 22px;
  margin-right: 30px;
  &:hover {
    cursor: pointer;
  }

  // font-weight: bold; 

  @media (max-width: 1050px) {
    font-size: 18px;
  }
`;
const LangIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 22px;
  margin-right: 4.5vw;

  // font-weight: bold; 

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1050px) {
    font-size: 18px;
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
            ADMIN
          </UserIcon>
          <LangIcon fontcolor={fontcolor}>LANGUAGE</LangIcon>
        </div>
      </NavBar>
    </div>
  );
};
export default Nav;
