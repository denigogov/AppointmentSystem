import Hero from "../../components/WebPageComponents/Hero";
import OurFutures from "../../components/WebPageComponents/OurFutures";
import OurServices from "../../components/WebPageComponents/OurServices";
import GetStarted from "../../components/WebPageComponents/GetStarted";

const WebPage = () => {
  return (
    <main>
      <Hero />
      <OurServices />
      <OurFutures />
      <GetStarted />
    </main>
  );
};

export default WebPage;
