import { ReactElement } from "react";
import "./home.scss";
import AppHeader from "../../components/appheader/appheader";
import FindForm from "../../components/findform/findform";
import CharacteristicsPanel from "../../components/characteristicspanel/characteristicspanel";

const Home = (): ReactElement => {
  return (
    <div className="homepage">
      <AppHeader />
      <main>
        <FindForm />
        <CharacteristicsPanel />
      </main>
    </div>
  );
};

export default Home;
