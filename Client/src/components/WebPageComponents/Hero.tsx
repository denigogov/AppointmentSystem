import "../../styling/WebPage/_header.scss";
import startIcon from "../../assets/stars-svgrepo-com.svg";
import { useAuth } from "../../helpers/Auth";
import { Link } from "react-router-dom";
import Loading from "../../pages/Loading";

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
  const { token } = useAuth();

  return (
    <div className="hero__container">
      <div className="hero__text--wrap">
        <h1 className="hero-title">
          Empower <br />
          your <span className="markedWord">salon</span> workflow.
          <img src={startIcon} alt="startIcon" />
        </h1>
        <p className="hero-subTitle">
          Efficiently streamline scheduling processes. Elevate customer
          satisfaction. Sign up now to unlock your salon's full potential.
        </p>

        <p className="action__button-global">
          {token ? (
            <Link style={{ color: "#fff" }} to="app">
              Get in Touch
            </Link>
          ) : (
            <Link style={{ color: "#fff" }} to="signup">
              Sign Up Now
            </Link>
          )}
        </p>
      </div>
      <div className="hero__image--wrap">
        {/*  I add aditional div to keep flex 1 on the main container when there is tablet view */}
        <div className="hero__image-container">
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default Hero;
