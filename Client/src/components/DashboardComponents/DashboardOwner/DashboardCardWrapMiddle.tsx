import topServiceRocketIcon from "../../../assets/topServiceRocketIcon.svg";
import bestEmployee from "../../../assets/bestEmployee.svg";
import daylyCountAppIcon from "../../../assets/daylyCountAppIcon.svg";
import DashboardCardTop from "./DashboardCardTop";
import { FetchDataByServiceProps } from "../../../types/tableApiTypes";

// type CalcTotalMoneyAndApp = {
//   totalAppointments?: number;
//   totalMoney?: string | number;
// };

interface DashboardCardWrapMiddleProps {
  filteredDataByService?: FetchDataByServiceProps[];
  calcTotalMoneyAndApp?: Pick<
    FetchDataByServiceProps,
    "totalAppointments" | "totalMoney"
  >;
  selectedService: string;
}

const DashboardCardWrapMiddle: React.FC<DashboardCardWrapMiddleProps> = ({
  filteredDataByService,
  calcTotalMoneyAndApp,
  selectedService,
}) => {
  return (
    <div className="dashboardCardWrapMiddle--Wrap">
      <DashboardCardTop
        title="Total Revenue"
        value={`€ ${
          selectedService !== "All"
            ? filteredDataByService![0]?.totalMoney
            : calcTotalMoneyAndApp?.totalMoney ?? "/"
        }`}
        footer="Full-Year Insights"
        hexColor="#80b3ff"
        cardFlexSize="0.3 20%"
        svgIcon={topServiceRocketIcon}
      />
      <DashboardCardTop
        title="Total Appointments"
        value={
          selectedService !== "All"
            ? filteredDataByService![0]?.totalAppointments
            : calcTotalMoneyAndApp?.totalAppointments ?? "/"
        }
        footer={`All Appointments`}
        hexColor="#f1c40f"
        cardFlexSize="0.3 20%"
        svgIcon={daylyCountAppIcon}
      />
      <DashboardCardTop
        title="Top Performer"
        value={
          selectedService !== "All"
            ? filteredDataByService![0]?.bestEmployer
            : "Not Found"
        }
        footer="Top Achievers"
        hexColor="#e74c3c"
        cardFlexSize="0.3 20%"
        svgIcon={bestEmployee}
      />{" "}
      {/* <DashboardCardTop
        title="Daily Appointments"
        value={30}
        footer="Today's Schedule"
        hexColor="#1abc9c"
        cardFlexSize="0.3 20%"
        svgIcon={totalAppDashIcon1}
      /> */}
    </div>
  );
};

export default DashboardCardWrapMiddle;
