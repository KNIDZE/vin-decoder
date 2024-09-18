import React from "react";
import Home from "./pages/home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Variables from "./pages/variables/variables";
import Variable from "./pages/singlevariable/variable";
import "./App.scss";
import { Constants } from "./common/constants/constants";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AppHead from "./components/appHead/apphead";

const router = createBrowserRouter([
  {
    path: Constants.HOME_PAGE_PATH as string,
    element: <Home />,
  },
  {
    path: Constants.VARIABLES_LIST_PAGE_PATH as string,
    element: <Variables />,
  },
  {
    path: Constants.SINGLE_VARIABLE_PATH as string,
    element: <Variable />,
  },
]);
function App() {
  return (
    <div className="app">
      <HelmetProvider>
        <AppHead />
      <RouterProvider router={router} />
      </HelmetProvider>
    </div>
  );
}

export default App;
