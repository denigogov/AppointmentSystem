import "../styling/_errorPage.scss";
import { Link, useLocation } from "react-router-dom";

interface ErrorProps {
  errorMessage: string;
  navigateTo1?: any;
  navigateTo2?: any;
}

const ErrorPage1 = ({ errorMessage, navigateTo1, navigateTo2 }: ErrorProps) => {
  const { pathname } = useLocation();

  return (
    <div className="errorContainer">
      <div className="wrapper">
        <div className="message">
          <h2>Oops! Something went wrong</h2>
          <p style={{ color: "#636363", fontSize: "16px" }}>
            www.nameofthewebpage{pathname} -{errorMessage}
          </p>
          <div
            className="navigateTo"
            style={{
              fontSize: "13px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>Navigate to</p>
            <Link to={navigateTo1} preventScrollReset={true}>
              {navigateTo1?.replaceAll("/", "")}
            </Link>
            <Link to={navigateTo2}>{navigateTo2?.replaceAll("/", "")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage1;
