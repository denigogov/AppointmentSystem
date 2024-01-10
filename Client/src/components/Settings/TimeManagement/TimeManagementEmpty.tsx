import { Link } from "react-router-dom";

interface TimeManagementEmptyProps {
  title: string;
  subTitle: string;
  btnName: string;
  linkName: string;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeManagementEmpty = ({
  title,
  subTitle,
  btnName,
  setPopupOpen,
  linkName,
}: TimeManagementEmptyProps) => {
  const handlePopUp = () => {
    setPopupOpen((x) => !x);
  };

  return (
    <div className="timemanagementEmpty__container">
      <p> {title} </p>
      <p className="timeManagement__emtpy--subTitle">{subTitle}</p>

      <Link to={linkName} onClick={handlePopUp}>
        <span className="currentVacationView__currentTime-btn">{btnName}</span>
      </Link>
    </div>
  );
};

export default TimeManagementEmpty;
