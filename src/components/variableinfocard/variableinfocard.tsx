import React from "react";
import "./variableinfocard.scss";
import { CardProps } from "../../common/interfaces/vininterfaces";
import { Constants } from "../../common/constants/constants";

const processDescription = (description: string) => {
  // sometimes from api i get just text, without tags...
  if (!description.startsWith("<p>")) {
    description = `<p>${description}</p>`;
  }
  return description.length < Constants.MAX_SYMBOLS_ON_CARD
    ? description
    : description.slice(0, Constants.MAX_SYMBOLS_ON_CARD) + "...";
};

const VariableInfoCard = (props: CardProps) => {
  const { description, title, id } = props;

  const extendedView = processDescription(description);
  return (
    <div key={id} className="variable-info-card">
      <h5>{title}</h5>
      <div
        className="description-container"
        dangerouslySetInnerHTML={{ __html: extendedView }}
      ></div>
    </div>
  );
};

export default VariableInfoCard;
