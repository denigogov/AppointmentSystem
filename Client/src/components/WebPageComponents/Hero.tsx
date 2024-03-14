import "../../styling/WebPage/_header.scss";
import startIcon from "../../assets/stars-svgrepo-com.svg";
import { useAuth } from "../../helpers/Auth";
import { Link } from "react-router-dom";
import Loading from "../../pages/Loading";
import LazyLoadingImage from "../../helpers/LazyLoadingImage";

interface HeroProps {
  observer: (node?: Element | null) => void;
}

const Hero: React.FC<HeroProps> = ({ observer }) => {
  const { token } = useAuth();

  return (
    // observer for the arrow top
    <header className="hero__container " ref={observer}>
      {/* observer for the text */}
      <div className="hero__text--wrap">
        <h1 className="hero-title">
          Empower <br />
          your <span className="markedWord">salon</span> workflow.
          <span className="icon-animationObserver">
            <LazyLoadingImage id="1" alt="startIcon" source={startIcon} />
          </span>
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
    </header>
  );
};

export default Hero;
