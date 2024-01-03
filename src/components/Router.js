import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Home from "../screen/Home";
import Admin from "../screen/Admin";
import Select from "../screen/Select";
import AllExp from "../screen/AllExp";
import Detail from "../screen/Detail";
import Script from "./admin/Script";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: (
      <div>
        <Root />
      </div>
    ),
    children: [
      {
        path: "",
        element: (
          <div>
            <Home />
          </div>
        ),
      },
      {
        path: "admin",
        element: (
          <div>
            <Admin />
          </div>
        ),
      },
      {
        path: "allexp",
        element: (
          <div>
            <PrivateRoute component={<AllExp />} />
          </div>
        ),
      },
      {
        path: "exp/:expId",
        element: (
          <div>
            <PrivateRoute component={<Detail />} />
          </div>
        ),
      },
      {
        path: "script",
        element: (
          <div>
            <PrivateRoute component={<Script />} />
          </div>
        ),
      },
      {
        path: "select",
        element: (
          <div>
            <Select />
          </div>
        ),
      },
    ],
  },
]);

export default router;
