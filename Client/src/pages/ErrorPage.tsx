import "../styling/_errorPage.scss";
import { Link, useLocation } from "react-router-dom";

interface ErrorProps {
  errorMessage?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigateTo1?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigateTo2?: any;
}
const apiUrl = import.meta.env.VITE_API_URL as string;
const ErrorPage1 = ({ errorMessage, navigateTo1, navigateTo2 }: ErrorProps) => {
  const { pathname } = useLocation();

  return (
    <div className="errorContainer">
      <div className="wrapper">
        <div className="message">
          <h2>Oops! Something went wrong</h2>
          <p style={{ color: "#636363", fontSize: "13px" }}>
            {apiUrl} <br />
            {pathname}
          </p>
          <p>
            <strong>{errorMessage}</strong>
          </p>
          <div className="navigateTo">
            {navigateTo1 && (
              <>
                <p>Navigate to</p>

                <Link to={navigateTo1} preventScrollReset={true}>
                  {navigateTo1?.replaceAll("/", "")}
                </Link>
              </>
            )}

            <Link to={navigateTo2}>{navigateTo2?.replaceAll("/", "")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage1;
