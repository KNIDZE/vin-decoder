import { ReactElement, useEffect, useMemo } from "react";
import AppHeader from "../../components/appheader/appheader";
import "./variables.scss";
import { useSelector } from "react-redux";
import { fetchVariablesList, selectVariablesInfo } from "../../store/actions";
import { useAppDispatch } from "../../store/hooks";
import VariableInfoCard from "../../components/variableinfocard/variableinfocard";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";

const Variables = (): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchVariablesList());
  }, [dispatch]);
  const { variables, errorMessage } = useSelector(selectVariablesInfo);

  const containerCondition = useMemo(() => {
    return variables.length > 0
      ? "full"
      : errorMessage === ""
      ? "loading"
      : "error";
  }, [variables.length, errorMessage]);

  const renderSwitch = useMemo(() => {
    switch (containerCondition) {
      case "loading":
        return <Loader />;
      case "full":
        return variables.map((variable) => (
          <Link key={variable.ID} to={`/variables/${variable.ID}`}>
            <VariableInfoCard
              title={variable.Name}
              description={variable.Description}
              id={variable.ID}
            />
          </Link>
        ));
      case "error":
        return <h3 className="error-message">{`${errorMessage}...`}</h3>;
      default:
        return <h3>Time to decode VIN...</h3>;
    }
  }, [variables, containerCondition, errorMessage]);
  return (
    <div className="variables-page">
      <AppHeader />
      <main>
        <div
          className={`variables-container ${containerCondition !== "full" ? "flex-center-panel" : ""}`}
        >
          {renderSwitch}
        </div>
      </main>
    </div>
  );
};

export default Variables;
