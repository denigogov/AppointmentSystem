import "../../styling/WebPage/_ourServices.scss";
import { useNavigate } from "react-router-dom";
import InfoCard from "../InfoCard";
import calendarIcon from "../../assets/calendarCard.svg";
import checkIcon from "../../assets/checkIcon.svg";
import userHeart from "../../assets/userHear.svg";
import lineChartIcon from "../../assets/lineChartCard.svg";

export interface CardsDataTypes {
  id: number;
  title: string;
  svg: string;
  className: string;
}

const OurServices = () => {
  const navigate = useNavigate();

  const cardsData: CardsDataTypes[] = [
    {
      id: 1,
      title: "Simplify Scheduling",
      svg: calendarIcon,
      className: "education",
    },
    {
      id: 2,
      title: "Streamline Management",
      svg: checkIcon,
      className: "credentialing",
    },
    {
      id: 3,
      title: "Enhance Client Experience",
      svg: userHeart,
      className: "wallet",
    },
    {
      id: 4,
      title: "Boost Productivity",
      svg: lineChartIcon,
      className: "human-resources",
    },
  ];

  return (
    <section className="ourServices">
      <div className="ourServices__container">
        <h2 className="ourServices__container-title">Features</h2>
        <p className="ourServices__container-subTitle">
          SalonPro Scheduler Suite System comes with a range of powerful
          features:
        </p>

        <article className="ourServices__cards testing">
          <InfoCard cardsData={cardsData} />
        </article>
        <article className="ourServices__container-footer">
          <p>Experience it Yourself!</p>
          <p className="ourServices__container-footer-subTitle ">
            Try out our demo version to explore SalonPro Scheduler's powerful
            features firsthand!
          </p>
          <button
            style={{ color: "#fff" }}
            className="ourServices__container-footer-btn"
            onClick={() => navigate("/app/dashboard")}
          >
            Explore Demo
          </button>
        </article>
      </div>
    </section>
  );
};

export default OurServices;
