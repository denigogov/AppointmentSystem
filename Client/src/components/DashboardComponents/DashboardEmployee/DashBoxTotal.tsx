import DashBoxTotalView from "./DashBoxTotalView";

const DashBoxTotal = () => {
  return (
    <div className="dashBoxTotalWrap">
      <div className="dashBoxTotalMonth">
        <DashBoxTotalView
          title={"Monthly Overview"}
          subTitle={"Total Appointments This Month"}
          count={26}
        />
      </div>
      <div className="dashBoxTotalYear">
        <DashBoxTotalView
          title={"Yearly Overview"}
          subTitle={"Total Appointments This Year"}
          count={140}
        />
      </div>
    </div>
  );
};

export default DashBoxTotal;
