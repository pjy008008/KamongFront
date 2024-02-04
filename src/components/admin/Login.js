import styled from "styled-components";
import Nav from "../Nav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #315c40;
  text-align: center;
`;

const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 380px;
  background-color: white;
  border-radius: 20px;
  text-align: center;

  
  @media (max-height: 599px) {
    height: 45vh;
  }
`;

const LoginTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-top: 85px;
  color: #2D2D2D;

  @media (max-height: 599px) {
    font-size: 25px;
    margin-top: 5vh;
  }
`;

const LoginForm = styled.form``;
const InputPswd = styled.input`
  border: none;
  width: 250px;
  height: 50px;
  background-color: #d5d5d5;
  text-align: center;
  margin-top: -5px;
  margin-bottom: 8px;
  font-size: 25px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
  }

  @media (max-height: 599px) {
    font-size: 25px;
    height: 10vh;
    margin-top: -10px;
  }

`;
const SubmitBtn = styled.button`
  border: none;
  width: 255px;
  height: 6vh;
  background-color: #2D2D2D;
  color: white;
  font-weight: bold;
  font-size: 25px;

  @media (max-height: 599px) {
    font-size: 20px;
    height: 10vh;
    margin-top: 1px;
  }
`;

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword((prev) => value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("idx", password);
    if (password === "1234") {
      navigate("/allexp");
    } else {
      alert("비밀번호가 틀립니다.");
    }
  };
  return (
    <div>
      <Background>
        <Nav fontcolor={"white"} />
        <LoginContainer>
          <LoginTitle>ADMIN</LoginTitle>
          <LoginForm onSubmit={onSubmit}>
            <InputPswd
              name="password"
              value={password}
              onChange={onChange}
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
            <br />
            <SubmitBtn type="submit">Login</SubmitBtn>
          </LoginForm>
        </LoginContainer>
      </Background>
    </div>
  );
};

export default Login;