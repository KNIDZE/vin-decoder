import { ReactElement, useEffect } from "react";
import AppHeader from "../../components/appheader/appheader";
import "./variable.scss";
import { useParams } from "react-router-dom";
import { fetchVariablesList, selectVariableById } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Loader from "../../components/loader/loader";
const Variable = (): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchVariablesList());
  }, []);
  const { variableId } = useParams();
  const variableData = useAppSelector((state) =>
    selectVariableById(state, variableId || "-1")
  );
  return (
    <div className="variable-page">
      <AppHeader />
      <main>
        <div className="information-container">
          {variableData && (
            <div className="inner-container">
              <h2>
                {variableData.Name}{" "}
                <span
                  style={{
                    display:
                      variableData.GroupName.length < 30 ? "initial" : "block",
                  }}
                >
                  | {variableData.GroupName}
                </span>
              </h2>
              <p>Variable ID: {variableId}</p>
              <p>DataType: {variableData.DataType}</p>
              <h5>Description:</h5>
              <div
                dangerouslySetInnerHTML={{ __html: variableData.Description }}
              ></div>
            </div>
          )}
          {!variableData && <Loader />}
        </div>
      </main>
    </div>
  );
};

export default Variable;
