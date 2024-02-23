import "../../../styling/Dashboard/_dashBoxContainer.scss";
import { fetchServiceProcentCurrentMonthTypes } from "../../../types/tableApiTypes";
import DashBoxProcentView from "./DashBoxProcentView";

interface DashBoxProcentContainerProps {
  serviceProcentCalc?: fetchServiceProcentCurrentMonthTypes[];
}
const DashBoxProcentContainer: React.FC<DashBoxProcentContainerProps> = ({
  serviceProcentCalc,
}) => {
  return (
    <div
      className={
        !serviceProcentCalc?.length ?? 0 > 4
          ? "dashBox--container-wrap dashBox--container-wrapExtraHigh"
          : "dashBox--container-wrap"
      }
    >
      {serviceProcentCalc?.map((arr, i) => {
        return (
          <div className="dashBoxProcentView-container" key={i}>
            <DashBoxProcentView
              serviceTitle={arr?.servicesName ?? "No Avaiable Data"}
              iconName={arr?.servicesName ?? "NotFound"}
              totalAppointments={
                arr?.currentMonthAppointments ?? "No Avaiable Data"
              }
              procentCalc={arr?.percentageDifference ?? 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DashBoxProcentContainer;
