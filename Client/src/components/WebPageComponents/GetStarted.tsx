import "../../styling/WebPage/_howItsWork.scss";
import ArticleText from "./ArticleText";
import Steps from "./Steps";
interface HowitsWorkProps {}

export type StepsDataType = {
  title: string;
  subTitle: string;
  img: string;
  alt: string;
};

const GetStarted: React.FC<HowitsWorkProps> = ({}) => {
  const isPhone = window.innerWidth <= 768;

  const stepsData: StepsDataType[] = [
    {
      title: "Create Your Account",
      subTitle: "Join us now to access all features and services",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/check-circle.svg",
      alt: "checkIn icon",
    },
    {
      title: "Verify Your Email",
      subTitle: "Confirm your email to complete your registration process",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/mail_outline_copy.svg",
      alt: "email icon",
    },
    {
      title: "Book Your Appointments",
      subTitle:
        "Schedule appointments effortlessly with our user-friendly interface",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/calendar.svg",
      alt: "calendar icon",
    },
  ];

  return (
    <section className="getStarted">
      <div className="getStarted__textContainer">
        <ArticleText
          title="Get Started in Three Simple Steps"
          subTitle="A Quick Guide to Using SalonPro Scheduler Suite System Like a Pro"
          text="Discover the seamless process of SalonPro Scheduler Suite System.
            Sign up, verify your email, and start booking appointments
            effortlessly"
          buttonText={isPhone ? "Sign Up Now" : ""}
          buttonNavigation={isPhone ? "signup" : ""}
        />

        <ArticleText
          title="Maximize Efficiency with SalonPro Scheduler"
          subTitle="Streamline your scheduling process and elevate your salon's performance."
          text="Experience the power of SalonPro Scheduler Suite System in optimizing your salon's workflow, reducing overhead, and enhancing customer satisfaction."
          additionalClassName="getStarted__textContainer-text2"
          buttonText="Sign Up Now"
          buttonNavigation="signup"
        />
      </div>
      <div className="getStarted__steps">
        <Steps stepsData={stepsData} />
      </div>
    </section>
  );
};

export default GetStarted;
