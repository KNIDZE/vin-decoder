import React from "react";
import "./appheader.scss";
const AppHeader = () => {
  return (
    <header>
      <h1>Vin-decoder</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">Variables</a>
      </nav>
    </header>
  );
};

export default AppHeader;
