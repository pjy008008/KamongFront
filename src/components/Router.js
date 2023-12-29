import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../routes/Home";
import Admin from "../routes/Admin";
import Select from "../routes/Select";

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
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
