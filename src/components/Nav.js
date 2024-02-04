import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import greenl from "../img/greenl.png";
import greenp from "../img/greenp.png";
import whitep from "../img/whitep.png";
import whitel from "../img/whitel.png";
const NavBar = styled.nav`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  margin: 0px;
`;

const Title = styled.h1`
  color: ${(props) => props.fontcolor};
  font-size: 26px;
  margin: 15px;
  margin-top: 1vh;
  margin-left: 5vw;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width:599px) {
    font-size: 20px;
    }
`;
const UserIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 20px;
  margin-right: 30px;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1199px) {
    font-size: 18px;
  }
  
  @media screen and (max-width:899px) {
    font-size: 16px;
    }
`;

const LangIcon = styled.span`
  color: ${(props) => props.fontcolor};
  font-size: 20px;
  margin-right: 4.5vw;

  // font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1199px) {
    font-size: 18px;
  }

  @media screen and (max-width:899px) {
    font-size: 16px;
    }
`;
const Icon = styled.img`
  width: 30px;
  height: 30px;
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
          <span style={{ marginRight: "20px" }} onClick={handleAdmin}>
            {fontcolor === "white" ? (
              <Icon src={whitep} />
            ) : (
              <Icon src={greenp} />
            )}
          </span>
          <span style={{ marginRight: "50px" }}>
            {fontcolor === "white" ? (
              <Icon src={whitel} />
            ) : (
              <Icon src={greenl} />
            )}
          </span>
        </div>
      </NavBar>
    </div>
  );
};
export default Nav;
