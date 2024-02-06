import { FetchTotalMoneyAppServiceProps } from "../../../types/tableApiTypes";
import moneyRevenue from "../../../assets/moneyRevenue.svg";
import topServiceRocketIcon from "../../../assets/topServiceRocketIcon.svg";
import totalAppDashIcon from "../../../assets/totalAppDashIcon.svg";
import DashboardCardTop from "./DashboardCardTop";

interface DashboardCardWrapTop {
  totalMoneyAppService?: FetchTotalMoneyAppServiceProps[];
}

const DashboardCardWrapTop: React.FC<DashboardCardWrapTop> = ({
  totalMoneyAppService,
}) => {
  return (
    <div className="dashboardCardWrapTop">
      <DashboardCardTop
        title="Total Revenue"
        value={`€ ${totalMoneyAppService![0]?.totalMoney ?? "0"}`}
        footer="Financial Overview"
        hexColor="#e91e63"
        svgIcon={moneyRevenue}
        cardFlexSize="0.3 20%"
      />
      <DashboardCardTop
        title="Top Performing Service"
        value={totalMoneyAppService![0]?.topService ?? "/"}
        footer="Service Analytics"
        hexColor="#e67e22"
        svgIcon={topServiceRocketIcon}
        cardFlexSize="0.3 20%"
      />
      <DashboardCardTop
        title="Total Appointments"
        value={totalMoneyAppService![0]?.totalAppointments ?? "/"}
        footer="Period History"
        hexColor="#2ecc71"
        cardFlexSize="0.3 20%"
        svgIcon={totalAppDashIcon}
      />
    </div>
  );
};

export default DashboardCardWrapTop;
