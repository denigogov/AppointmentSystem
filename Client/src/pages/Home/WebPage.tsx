import Hero from "../../components/WebPageComponents/Hero";
import OurFutures from "../../components/WebPageComponents/OurFutures";
import OurServices from "../../components/WebPageComponents/OurServices";
import GetStarted from "../../components/WebPageComponents/GetStarted";
import PortfolioSection from "../../components/WebPageComponents/PortfolioSection";
import ContactForm from "../../components/WebPageComponents/ContactForm";
import arrowScrollTop from "../../assets/arrowScrollTop.svg";
import { useInView } from "react-intersection-observer";

const WebPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const scrollOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {!inView && (
        <img
          onClick={scrollOnTop}
          src={arrowScrollTop}
          alt="arrowSCrollTop"
          className="arrow-scroll"
        />
      )}

      <Hero observer={ref} />
      <OurServices />
      <OurFutures />
      <GetStarted />
      <PortfolioSection />
      <ContactForm />
    </main>
  );
};

export default WebPage;
