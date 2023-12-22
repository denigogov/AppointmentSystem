import "../../../styling/Components/dashboard components/_dashBoxProcentView.scss";
import shaveIcon from "../../../assets/shave.svg";
import haircutIcon from "../../../assets/haircutIcon.svg";
import coloringIcon from "../../../assets/ColoringIcon.svg";
import arrowUpIcon from "../../../assets/arrowUpIcon.svg";

interface DashbBoxViewProp {
  iconName?: string;
  procentCalc?: number | undefined;
  serviceTitle?: string;
  totalAppointments?: number | null;
}

const DashBoxProcentView = ({
  procentCalc = 0,
  iconName,
  serviceTitle,
  totalAppointments,
}: DashbBoxViewProp) => {
  const iconMap: Record<string, string> = {
    shave: shaveIcon,
    haircut: haircutIcon,
    coloring: coloringIcon,
    test: arrowUpIcon,
  };
  // Use the iconName prop to get the corresponding icon path from the map
  const iconPath = iconName ? iconMap[iconName] : undefined;

  return (
    <div className="dashBoxProcentView--wrap">
      <div className="DashBox__iconBox">
        <h5>{serviceTitle ?? ""}</h5>
        {iconPath && <img src={iconPath} alt={`${iconName} icon`} />}
      </div>

      <div className="totalAppDashBox">
        <h4>{totalAppointments ?? null}</h4>

        <div
          className={`dash-procent-wrap ${
            procentCalc >= 0 ? "positiveNumberGreen" : "negativeNumberRed"
          } `}
        >
          <img src={arrowUpIcon} alt="arrowUp-Icon" />
          <p>{procentCalc} %</p>
        </div>
      </div>

      <p className="footerDashProcent">Since last month</p>
    </div>
  );
};

export default DashBoxProcentView;
