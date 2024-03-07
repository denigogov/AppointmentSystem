import { Link } from "react-router-dom";

interface ArticleTextProps {
  title: string;
  subTitle: string;
  text: string;
  additionalClassName: string;
  buttonText: string;
  buttonNavigation: string;
  additionalBtnStyle: string;
  subTitleHighLight: string;
  additionalSubTitle: string;
  additionalSubTitleColor: string;
}

const ArticleText: React.FC<Partial<ArticleTextProps>> = ({
  title,
  subTitle,
  subTitleHighLight,
  additionalSubTitle,
  additionalSubTitleColor,
  text,
  additionalClassName,
  buttonText,
  buttonNavigation,
  additionalBtnStyle,
}) => {
  return (
    <div className={`${additionalClassName} articleText`}>
      <p className="articleText__title">{title}</p>
      <h3 className="articleText__subTitle">
        {subTitle}
        {subTitleHighLight && (
          <span style={{ color: `${additionalSubTitleColor}` }}>
            {subTitleHighLight}
          </span>
        )}
        {additionalSubTitle && additionalSubTitle}
      </h3>
      <p className="articleText__info">{text}</p>

      {buttonText && buttonNavigation && (
        <p className="articleText__btn">
          <Link
            className={`action__button-global ${additionalBtnStyle}`}
            style={{ color: "#fff" }}
            to={buttonNavigation}
          >
            {buttonText}
          </Link>
        </p>
      )}
    </div>
  );
};

export default ArticleText;
