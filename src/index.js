import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router";
import Modal from "react-modal";

Modal.setAppElement("#root"); // #root는 앱의 루트 엘리먼트 ID에 해당

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
