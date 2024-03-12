import "../../styling/WebPage/_ourServices.scss";
import { useNavigate } from "react-router-dom";
import InfoCard from "../InfoCard";
import calendarIcon from "../../assets/calendarCard.svg";
import checkIcon from "../../assets/checkIcon.svg";
import userHeart from "../../assets/userHear.svg";
import lineChartIcon from "../../assets/lineChartCard.svg";
import { useInView } from "react-intersection-observer";

export interface CardsDataTypes {
  id: number;
  title: string;
  svg: string;
  className: string;
  cardRef: (node?: Element | null) => void;
  inView: boolean;
}

const OurServices = () => {
  const navigate = useNavigate();

  // Creating multiple REF and VIEWS
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const { ref: cardRef1, inView: cardInView1 } = useInView({
    triggerOnce: true,
  });
  const { ref: cardRef2, inView: cardInView2 } = useInView({
    triggerOnce: true,
  });
  const { ref: cardRef3, inView: cardInView3 } = useInView({
    triggerOnce: true,
  });
  const { ref: cardRef4, inView: cardInView4 } = useInView({
    triggerOnce: true,
  });

  const cardsData: CardsDataTypes[] = [
    {
      id: 1,
      title: "Simplify Scheduling",
      svg: calendarIcon,
      className: `education ${cardInView1 ? "card-observerShow" : ""}`,
      cardRef: cardRef1,
      inView: cardInView1,
    },
    {
      id: 2,
      title: "Streamline Management",
      svg: checkIcon,
      className: `credentialing ${cardInView2 ? "card-observerShow" : ""}`,
      cardRef: cardRef2,
      inView: cardInView2,
    },
    {
      id: 3,
      title: "Enhance Client Experience",
      svg: userHeart,
      className: `wallet ${cardInView3 ? "card-observerShow" : ""}`,
      cardRef: cardRef3,
      inView: cardInView3,
    },
    {
      id: 4,
      title: "Boost Productivity",
      svg: lineChartIcon,
      className: `human-resources ${cardInView4 ? "card-observerShow" : ""}`,
      cardRef: cardRef4,
      inView: cardInView4,
    },
  ];

  return (
    <section className="ourServices">
      <div className="ourServices__container">
        <h2
          className={`ourServices__container-title  ${
            inView ? "title-observer" : ""
          }`}
          ref={ref}
        >
          Features
        </h2>
        <p
          className={`ourServices__container-subTitle  ${
            inView ? "title-observer" : ""
          }`}
        >
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
