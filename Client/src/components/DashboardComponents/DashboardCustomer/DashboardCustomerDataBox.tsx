import "../../../styling/Components/dashboard components/_dashboardCustomerRight.scss";
import { CustomerDataBoxType } from "../../../types/tableApiTypes";
import DashboardCardTop, {
  DashboardCardTopProps,
} from "../DashboardOwner/DashboardCardTop";
import totalAppointmentsIcon from "../../../assets/totalAppDashIcon.svg";
import totalPointIcon from "../../../assets/totalPointIcon.svg";
import totalMoneyIcon from "../../../assets/daylyCountAppIcon.svg";

const DashboardCustomerRight = ({
  customerDataBox,
}: {
  customerDataBox: CustomerDataBoxType;
}) => {
  const cardData: DashboardCardTopProps[] = [
    {
      title: "Total Point",
      value: "15/30",
      footer: "Points Overview",
      hexColor: "#A8D8EA",
      svgIcon: totalPointIcon,
    },
    {
      title: "Total Amount",
      value: `€ ${customerDataBox?.totalAmount ?? 0} `,
      footer: "Amount Overview",
      hexColor: "#B6E6BD",
      svgIcon: totalAppointmentsIcon,
    },
    {
      title: "Total Appointments",
      value: customerDataBox?.totalAppointments ?? 0,
      footer: "Appointments Overview",
      hexColor: "#ff9696",
      svgIcon: totalMoneyIcon,
    },
  ];

  return (
    <div className="dashboardCustomerRight--container">
      {cardData.map((card, i) => (
        <DashboardCardTop
          key={i}
          title={card.title}
          value={card.value}
          footer={card.footer}
          cardFlexSize="1"
          hexColor={card.hexColor}
          svgIcon={card.svgIcon}
        />
      ))}
    </div>
  );
};

export default DashboardCustomerRight;
