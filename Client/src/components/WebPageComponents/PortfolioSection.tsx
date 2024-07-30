import "../../styling/WebPage/_portfolioSection.scss";
import ArticleText from "./ArticleText";
import carpetCare1 from "../../assets/carpetCare1.png";
import carpetCare2 from "../../assets/carpetCare2.png";
import carpetCare4 from "../../assets/carpetCare5.png";
import nexigo1 from "../../assets/nexiGo1.png";
import nexigo2 from "../../assets/nexiGo2.png";
import nexigo3 from "../../assets/nexiGo3.png";
import LazyLoadingImage from "../../helpers/LazyLoadingImage";
import { useInView } from "react-intersection-observer";
const PortfolioSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <article className="tete">
      <section
        className={`portfolioSection ${
          inView && "portfolio-observerAnimation"
        }`}
      >
        <div className="portfolioSection__text">
          <ArticleText
            title="Some Other Portfolio Projects"
            subTitle="Introducing"
            subTitleHighLight=" Nexigo"
            additionalSubTitle=" Streamline, Simplify, Succeed"
            additionalSubTitleColor="#007bff"
            text="Dive into the future of invoice management with nexigo, my full-stack creation using ReactTS, Node.js, and MySQL. As the sole architect of nexigo, I've crafted a seamless experience that boosts productivity with features like 𝐓𝐰𝐨-𝐅𝐚𝐜𝐭𝐨𝐫 𝐀𝐮𝐭𝐡𝐞𝐧𝐭𝐢𝐜𝐚𝐭𝐢𝐨𝐧 and 𝐜𝐮𝐬𝐭𝐨𝐦𝐢𝐳𝐚𝐛𝐥𝐞 𝐰𝐨𝐫𝐤𝐟𝐥𝐨𝐰𝐬. I'm on the lookout for new opportunities to join forces with teams that value innovation and excellence. Let's drive progress together!"
            buttonText="Check it Out"
            buttonNavigation="https://invoicesystempro.onrender.com/login"
            additionalBtnStyle="portfolioSection__text-button"
            observerIntersepcting={ref}
          />
        </div>
        <div className="portfolioSection__image">
          <div className="carousel-wrapper">
            <div className="carousel-container">
              <div className="carousel">
                <LazyLoadingImage
                  source={nexigo1}
                  alt="appScreenShot1"
                  id="5"
                />
                <LazyLoadingImage
                  source={nexigo2}
                  alt="appScreenShot2"
                  id="6"
                />
                <LazyLoadingImage
                  source={nexigo3}
                  alt="appScreenShot3"
                  id="7"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* /////////////////////////// */}
      <section
        className={`portfolioSection ${
          inView && "portfolio-observerAnimation"
        }`}
      >
        <div className="portfolioSection__text">
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
            </div>{" "}
          </div>{" "}
        </div>

        <ArticleText
          subTitle="Introducing"
          subTitleHighLight=" LuxyCo"
          additionalSubTitle=" Carpet Care Manager"
          additionalSubTitleColor="#da0063"
          text="CarpetCareManager is a powerful solution designed to streamline carpet cleaning businesses' operations, increasing efficiency by 30%. With features such as streamlined order management, efficient inventory control, and comprehensive business insights, CarpetCareManager empowers businesses to optimize their processes and enhance customer satisfaction"
          buttonText="Check it Out"
          buttonNavigation="https://carpetcaremanager.onrender.com/"
          additionalBtnStyle="portfolioSection__text-button"
        />
      </section>
    </article>
  );
};

export default PortfolioSection;
