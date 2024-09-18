import { ReactElement } from "react";
import AppHeader from "../../components/appheader/appheader";
import './variable.scss'
import { useParams } from "react-router-dom";
const Variable = (): ReactElement => {
  const {variableId} = useParams()
  return (
    <div className="variable-page">
      <AppHeader />
      <main>
        <p>this is page variable {variableId}</p>
      </main>
    </div>
  );
};

export default Variable;
