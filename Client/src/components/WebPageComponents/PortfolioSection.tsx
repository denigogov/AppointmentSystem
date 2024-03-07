import "../../styling/WebPage/_portfolioSection.scss";
import ArticleText from "./ArticleText";
import carpetCare1 from "../../assets/carpetCare1.png";
import carpetCare2 from "../../assets/carpetCare2.png";
import carpetCare4 from "../../assets/carpetCare5.png";
import LazyLoadingImage from "../../helpers/LazyLoadingImage";
const PortfolioSection: React.FC = ({}) => {
  return (
    <section className="portfolioSection">
      <div className="portfolioSection__text">
        <ArticleText
          title="Some Other Portfolio Projects"
          subTitle="Introducing"
          subTitleHighLight=" LuxyCo"
          additionalSubTitle=" Carpet Care Manager"
          additionalSubTitleColor="#da0063"
          text="CarpetCareManager is a powerful solution designed to streamline carpet cleaning businesses' operations, increasing efficiency by 30%. With features such as streamlined order management, efficient inventory control, and comprehensive business insights, CarpetCareManager empowers businesses to optimize their processes and enhance customer satisfaction"
          buttonText="Check it Out"
          buttonNavigation="https://carpetcaremanager.onrender.com/"
          additionalBtnStyle="portfolioSection__text-button"
        />
      </div>
      <div className="portfolioSection__image">
        <div className="carousel-wrapper">
          <div className="carousel-container">
            <div className="carousel">
              <LazyLoadingImage
                source={carpetCare1}
                alt="appScreenShot1"
                id="1"
              />
              <LazyLoadingImage
                source={carpetCare2}
                alt="appScreenShot2"
                id="2"
              />
              <LazyLoadingImage
                source={carpetCare4}
                alt="appScreenShot3"
                id="3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
