import "../styling/_textAnimation.scss";

const TextAnimation: React.FC = () => {
  return (
    <div className="textAnimation__container">
      <p className="content__container__text">Continuous Improvement</p>
      <div className="content">
        <div className="content__container">
          <ul className="content__container__list">
            <li className="content__container__list__item">Efficiency</li>
            <li className="content__container__list__item">Performance</li>
            <li className="content__container__list__item">Optimization</li>
            <li className="content__container__list__item">Analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextAnimation;
