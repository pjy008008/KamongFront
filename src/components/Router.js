import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import Home from "../routes/Home";
import Admin from "../routes/Admin";
import Select from "../routes/Select";
import Detail from "../routes/Detail";
import Script from "./admin/Script";

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
        path: "select",
        element: (
          <div>
            <Select />
          </div>
        ),
      },
      {
        path: "test",
        element: (
          <div>
            <Detail />
          </div>
        ),
      },
    ],
  },
]);

export default router;
