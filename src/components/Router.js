import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../routes/Home";
import Admin from "../routes/Admin";
import Select from "../routes/Select";
import Detail from "../routes/Detail";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: `${process.env.PUBLIC_URL}/`,
      element: (
        <div>
          <Home />
        </div>
      ),
    },
    {
      path: `${process.env.PUBLIC_URL}/admin`,
      element: (
        <div>
          <Admin />
        </div>
      ),
    },
    {
      path: `${process.env.PUBLIC_URL}/select`,
      element: (
        <div>
          <Select />
        </div>
      ),
    },
    {
      //해당 페이지는 테스트 페이지로 실제로 routing하지는 않을거임
      path: `${process.env.PUBLIC_URL}/test`,
      element: (
        <div>
          <Detail />
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
