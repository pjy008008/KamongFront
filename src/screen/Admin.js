import { useState } from "react";
import Login from "../components/admin/Login";
import Edit from "../components/admin/Edit";
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div><Login /></div>
  );
};
export default Admin;
