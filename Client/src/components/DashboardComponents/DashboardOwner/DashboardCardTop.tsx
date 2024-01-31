import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardCardTop.scss";
import testIcon from "../../../assets/calendarNavigation.svg";

interface DashboardCardTopProps {
  title: string;
  value: string | number;
  footer: string;
  hexColor: string;
}

const DashboardCardTop: React.FC<DashboardCardTopProps> = ({
  title,
  value,
  footer,
  hexColor,
}) => {
  const cardStyleChangeColor = {
    "--c": hexColor || "#ff8080", // --c is added inside of mixin its work ! (can change css property direclty from component dynamicly !!)
  } as React.CSSProperties;

  return (
    <div className="dashboardCardTop__container" style={cardStyleChangeColor}>
      <div className="dashboardCard__text">
        <p className="dashboardCard__title">{title}</p>
        <p className="dashboardCard__value">{value}</p>
        <p className="dashboardCard__footer">{footer}</p>
      </div>
      <div className="dashboarCardIcon">
        <img src={testIcon} alt="" style={{ backgroundColor: hexColor }} />
      </div>
    </div>
  );
};

export default DashboardCardTop;
