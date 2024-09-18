import React from "react";
import "./appheader.scss";
import { Link } from "react-router-dom";
const AppHeader = () => {
  return (
    <header>
      <Link to="/">
        <h1>Vin-decoder</h1>
      </Link>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/variables'>Variables</Link>
      </nav>
    </header>
  );
};

export default AppHeader;
