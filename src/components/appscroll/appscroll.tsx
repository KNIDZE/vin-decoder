import React from "react";
import "./appscroll.scss";

const AppScroll = (props: { pixels: number }) => {
  const pixels = props.pixels;

  return <div className="scroll-element" style={{ top: pixels }}></div>;
};

export default AppScroll;
