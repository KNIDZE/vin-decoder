import React, { useState } from "react";
import "./variablecard.scss";
import { VinVariable } from "../../common/interfaces/vininterfaces";
import { Constants } from "../../common/constants/constants";

const VariableCard = (props: { variable: VinVariable }) => {
  const { variable } = props;
  const [isMouseOver, setMousedOver] = useState(false);
  const toggleMouseOver = () => {
    setMousedOver((prevState) => !prevState);
  };
  const extendedView =
    variable.Value.length < Constants.MAX_SYMBOLS_ON_CARD
      ? variable.Value
      : variable.Value.slice(0, Constants.MAX_SYMBOLS_ON_CARD) + "...";
  return (
    <div
      key={variable.Variable}
      className="variable-card"
      onMouseEnter={toggleMouseOver}
      onMouseLeave={toggleMouseOver}
    >
      <h5>{variable.Variable}</h5>
      <p>{isMouseOver ? variable.Value : extendedView}</p>
    </div>
  );
};

export default VariableCard;
