import styled from "styled-components";
import Nav from "../Nav";
import { useState } from "react";
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #315c40;
  text-align: center;
`;
const LoginContainer = styled.div`
  /* 상하좌우 정중앙 정렬하기 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 30vw;
  margin: 0 auto;
  height: 50vh;
  background-color: white;
  border-radius: 20px;
  text-align: center;
`;
const LoginTitle = styled.h2`
  font-size: 50px;
  font-weight: bold;
  margin-top: 7vw;
  color: #4b3327;
`;
const LoginForm = styled.form``;
const InputPswd = styled.input`
  border: none;
  width: 15vw;
  height: 5vh;
  background-color: #d5d5d5;
  text-align: center;
  margin-bottom: 20px;
  font-size: 25px;
  &:focus {
    outline: 2px solid black;
  }
`;
const SubmitBtn = styled.button`
  border: none;
  width: 15vw;
  height: 5vh;
  background-color: #4b3327;
  color: white;
  font-weight: bold;
  font-size: 25px;
`;

const Login = ({ setIsLoggedIn }) => {
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword((prev) => value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (password === "1234") {
      setIsLoggedIn((prev) => true);
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
