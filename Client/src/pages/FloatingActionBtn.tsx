import "../styling/_floatingActionBtn.scss";
import iconexample from "../assets/deleteIcon.svg";
import iconDetails from "../assets/editUserIcon1.svg";
import moreIcon from "../assets/moreDetailsIcon.svg";
interface FloatingActionBtnProps {
  // Define props here
}

const FloatingActionBtn: React.FC<FloatingActionBtnProps> = (
  {
    /* destructure props here */
  }
) => {
  return (
    <div className="float-container--dashboard">
      <div className="wrapper">
        <input type="checkbox" />
        {/* button */}
        <div className="floatBtn">
          <img src={moreIcon} alt="delete button" />
        </div>

        {/* float */}
        <div className="float-window">
          <a href="#">
            <img src={iconexample} alt="delete button" />
          </a>
          <a href="#">
            <img src={iconDetails} alt="delete button" />
          </a>
          <a href="#">
            <i className="fas fa-wallet"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionBtn;
