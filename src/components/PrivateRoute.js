import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const authenticated = localStorage.getItem("idx");

  //배포할 때는 수정이 필요함 비밀번호 깃에 노출 안되게 할 것
  const validation = authenticated === process.env.REACT_APP_PASSWORD;
  return validation ? (
    Component
  ) : (
    <Navigate to="/" {...alert("접근할 수 없는 페이지입니다.")} />
  );
};

export default PrivateRoute;
