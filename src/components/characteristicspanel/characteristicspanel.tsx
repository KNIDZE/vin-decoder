import "./characteristicspanel.scss";
import { useAppSelector } from "../../store/hooks";
import { selectVinState } from "../../store/actions";
import Loader from "../loader/loader";
import VariableCard from "../variablecard/variablecard";
const CharacteristicsPanel = () => {
  const { isDataLoading, variables } = useAppSelector(selectVinState);
  const panelCondition = isDataLoading
    ? "loading"
    : variables.length === 0
      ? "empty"
      : "full";

  const panelStyle = `panel ${panelCondition !== "full" ? "flex-center" : ""}`;
  return (
    <div className={panelStyle}>
      {panelCondition === "loading" && <Loader />}

      {panelCondition === "empty" && <h3>Time to decode VIN...</h3>}
      {panelCondition === "full" &&
        variables.map((variable) => (
          <VariableCard key={variable.VariableId} variable={variable} />
        ))}
    </div>
  );
};

export default CharacteristicsPanel;
