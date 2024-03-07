import Hero from "../../components/WebPageComponents/Hero";
import OurFutures from "../../components/WebPageComponents/OurFutures";
import OurServices from "../../components/WebPageComponents/OurServices";
import GetStarted from "../../components/WebPageComponents/GetStarted";
import PortfolioSection from "../../components/WebPageComponents/PortfolioSection";

const WebPage = () => {
  return (
    <main>
      <Hero />
      <OurServices />
      <OurFutures />
      <GetStarted />
      <PortfolioSection />
    </main>
  );
};

export default WebPage;
