import "../../styling/WebPage/_ourFutures.scss";
import ownerDashboardImage from "../../assets/haircutOwnerDashboard.png";
import employerDashboardImage from "../../assets/employerOwner.png";
import customerDashboard from "../../assets/customerdashboard.png";
import LazyLoadingImage from "../../helpers/LazyLoadingImage";
import ArticleText from "./ArticleText";
import { useInView } from "react-intersection-observer";

const OurFutures: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const images = [
    {
      id: 1,
      alt: "Owner Dashboard",
      source: ownerDashboardImage,
    },
    {
      id: 2,
      alt: "Employer Dashboard",
      source: employerDashboardImage,
    },
    {
      id: 3,
      alt: "Cusotmer Dashboard",
      source: customerDashboard,
    },
  ];

  return (
    <div className="ourFutures" ref={ref}>
      <div
        className={`ourFutures__text ${
          inView ? "ourFuture-observerAnimation" : ""
        }`}
      >
        <ArticleText
          title="Explore SalonPro Scheduler"
          subTitle="Discover the Versatility of Our Dashboard Solutions"
          text="Unlock the potential of SalonPro Scheduler with our versatile
          dashboard solutions. Gain insights, manage tasks, and track progress
          effortlessly through intuitive and customizable dashboards. Experience
          streamlined workflows and enhanced productivity today."
        />
      </div>
      <div className="ourFutures__image">
        <div className="gallery">
          {images.map((img) => (
            <LazyLoadingImage
              key={img.id}
              id={img.id.toString()}
              source={img.source}
              alt={img.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurFutures;
