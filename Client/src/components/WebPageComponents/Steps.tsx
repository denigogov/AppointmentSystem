import { StepsDataType } from "./GetStarted";

interface StepsProps {
  stepsData: StepsDataType[];
}

const Steps: React.FC<StepsProps> = ({ stepsData }) => {
  // CSS Ronny Siikaluoma  https://codepen.io/siiron

  return (
    <div className="steps">
      <div className="container">
        <ul className="step-list">
          {stepsData.map((text, i) => (
            <li className="step-list__item " key={i}>
              <div className="step-list__item__inner">
                <div className="content">
                  <div className="body">
                    <h2>{text.title}</h2>
                    <p>{text.subTitle}</p>
                  </div>

                  <div className="icon">
                    <img src={text.img} alt="Check" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Steps;
