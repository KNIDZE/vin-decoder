import React from "react";
import Home from "./pages/home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Variables from "./pages/variables/variables";
import Variable from "./pages/singlevariable/variable";
import './App.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "variables",
    element: <Variables />,
  },
  {
    path: "/variables/:variableId",
    element: <Variable />,
  },
]);
function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
