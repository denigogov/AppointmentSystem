import "../../../styling/Dashboard/_dashBoxContainer.scss";
import { fetchServiceProcentCurrentMonthTypes } from "../../../types/tableApiTypes";
import DashBoxProcentView from "./DashBoxProcentView";

interface DashBoxProcentContainerProps {
  serviceProcentCalc: fetchServiceProcentCurrentMonthTypes[];
}
const DashBoxProcentContainer = ({
  serviceProcentCalc,
}: DashBoxProcentContainerProps) => {
  return (
    <div
      className={
        serviceProcentCalc.length > 4
          ? "dashBox--container-wrap dashBox--container-wrapExtraHigh"
          : "dashBox--container-wrap"
      }
    >
      {serviceProcentCalc.map((arr, i) => {
        return (
          <div className="dashBoxProcentView-container" key={i}>
            <DashBoxProcentView
              serviceTitle={arr?.servicesName}
              iconName={arr?.servicesName}
              totalAppointments={arr?.currentMonthAppointments}
              procentCalc={arr?.percentageDifference ?? 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DashBoxProcentContainer;
