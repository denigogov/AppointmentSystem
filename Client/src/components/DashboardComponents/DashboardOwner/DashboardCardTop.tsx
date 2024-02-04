import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardCardTop.scss";

interface DashboardCardTopProps {
  title?: string;
  value?: string | number;
  footer?: string;
  hexColor?: string;
  svgIcon?: string;
  cardFlexSize?: string;
}

const DashboardCardTop: React.FC<DashboardCardTopProps> = ({
  title,
  value,
  footer,
  hexColor,
  cardFlexSize,
  svgIcon,
}) => {
  const cardStyleChangeColor = {
    "--c": hexColor || "#ff8080", // --c is added inside of mixin its work ! (can change css property direclty from component dynamicly !!)
    flex: `${cardFlexSize}`,
  } as React.CSSProperties;

  return (
    <div className="dashboardCardTop__container" style={cardStyleChangeColor}>
      <div className="dashboardCard__text">
        <p className="dashboardCard__title">{title}</p>
        <p className="dashboardCard__value">{value}</p>
        <p className="dashboardCard__footer">{footer}</p>
      </div>
      <div className="dashboarCardIcon">
        <img src={svgIcon} alt="" style={{ backgroundColor: hexColor }} />
      </div>
    </div>
  );
};

export default DashboardCardTop;