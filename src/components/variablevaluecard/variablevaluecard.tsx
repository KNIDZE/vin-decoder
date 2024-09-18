import React, { useState } from "react";
import "./variablecard.scss";
import { Constants } from "../../common/constants/constants";
interface CardProps {
  title: string;
  description: string;
  id: string | number;
  extendable?: true;
}

const VariableValueCard = (props: CardProps) => {
  const { description, title, id } = props;
  const [isMouseOver, setMousedOver] = useState(false);

  const toggleMouseOver = () => {
    setMousedOver((prevState) => !prevState);
  };
  const extendedView =
    description.length < Constants.MAX_SYMBOLS_ON_CARD
      ? description
      : description.slice(0, Constants.MAX_SYMBOLS_ON_CARD) + "...";
  return (
    <div
      key={id}
      className="variable-card"
      onMouseEnter={toggleMouseOver}
      onMouseLeave={toggleMouseOver}
    >
      <h5>{title}</h5>
      <p>{isMouseOver ? description : extendedView}</p>
    </div>
  );
};

export default VariableValueCard;
