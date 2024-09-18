import "./characteristicspanel.scss";
import { useAppSelector } from "../../store/hooks";
import { selectVinState } from "../../store/actions";
import Loader from "../loader/loader";
import VariableValueCard from "../variablevaluecard/variablevaluecard";
import { Constants } from "../../common/constants/constants";

const choosePanelState = (
  isDataLoading: boolean,
  errorMessage: string,
  variablesLength: number
) => {
  if (errorMessage !== "") return Constants.PANEL_ERROR_STATE;
  if (isDataLoading) return Constants.PANEL_LOADING_STATE;
  if (variablesLength === 0) return Constants.PANEL_EMPTY_STATE;

  return Constants.PANEL_FULL_STATE;
};

const CharacteristicsPanel = () => {
  const { isDataLoading, variables, errorMessage, apiMessage } =
    useAppSelector(selectVinState);

  let panelCondition = choosePanelState(isDataLoading, errorMessage, variables.length);

  const panelStyle = `panel ${panelCondition !== "full" ? "flex-center-panel" : ""}`;
  const renderSwitch = () => {
    switch (panelCondition) {
      case "loading":
        return <Loader />;
      case "full":
        return variables.map((variable) => (
          <VariableValueCard
            key={variable.VariableId}
            title={variable.Variable}
            description={variable.Value}
            id={variable.VariableId}
          />
        ));
      case "error":
        return <h3 className="error-message">{`${errorMessage}...`}</h3>;
      default:
        return <h3>Time to decode VIN...</h3>;
    }
  };
  return (
    <div className={panelStyle}>
      {apiMessage !== "" && !isDataLoading && <h2>{apiMessage}</h2>}
      {renderSwitch()}
    </div>
  );
};

export default CharacteristicsPanel;
