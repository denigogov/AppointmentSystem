import "../../../styling/Dashboard/_dashBoxContainer.scss";
import DashBoxProcentView from "./DashBoxProcentView";

const DashBoxProcentContainer = () => {
  return (
    <div className="dashBoxProcentView--wrap">
      <div className="top-container">
        <article className="top-section">
          <DashBoxProcentView
            serviceTitle={"Haircut"}
            iconName={"haircut"}
            totalAppointments={210}
            procentCalc={5}
          />
        </article>
        <article className="bottom-section">
          <DashBoxProcentView
            serviceTitle={"Shaving"}
            iconName={"shave"}
            totalAppointments={6}
            procentCalc={-20}
          />
        </article>
      </div>
      <div className="bottom-container">
        <article className="top-section">
          <DashBoxProcentView
            serviceTitle={"Coloring"}
            iconName={"coloring"}
            totalAppointments={6}
            procentCalc={100}
          />
        </article>
        <article className="bottom-section">
          <DashBoxProcentView
            serviceTitle={"Haircut"}
            iconName={"haircut"}
            totalAppointments={6}
            procentCalc={0}
          />
        </article>
      </div>
    </div>
  );
};

export default DashBoxProcentContainer;
