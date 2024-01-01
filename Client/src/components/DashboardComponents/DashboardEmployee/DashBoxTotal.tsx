import { FetchAppointmentsTotalTypes } from "../../../types/tableApiTypes";
import DashBoxTotalView from "./DashBoxTotalView";

interface DashBoxTotalProps {
  totalAppointments: FetchAppointmentsTotalTypes;
}

const DashBoxTotal = ({ totalAppointments }: DashBoxTotalProps) => {
  return (
    <div className="dashBoxTotalWrap">
      <div className="dashBoxTotalMonth">
        <DashBoxTotalView
          title={"Monthly Overview"}
          subTitle={"Total Appointments This Month"}
          count={totalAppointments.monthlyAppointments}
        />
      </div>
      <div className="dashBoxTotalYear">
        <DashBoxTotalView
          title={"Yearly Overview"}
          subTitle={"Total Appointments This Year"}
          count={totalAppointments.yearlyAppointments}
          totalTime={totalAppointments.totalAppointments}
        />
      </div>
    </div>
  );
};

export default DashBoxTotal;
