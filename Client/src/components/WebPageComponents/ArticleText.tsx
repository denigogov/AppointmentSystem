import { Link } from "react-router-dom";

interface ArticleTextProps {
  title: string;
  subTitle: string;
  text: string;
  additionalClassName: string;
  buttonText: string;
  buttonNavigation: string;
}

const ArticleText: React.FC<Partial<ArticleTextProps>> = ({
  title,
  subTitle,
  text,
  additionalClassName,
  buttonText,
  buttonNavigation,
}) => {
  return (
    <div className={`${additionalClassName} articleText`}>
      <p className="articleText__title">{title}</p>
      <h3 className="articleText__subTitle">{subTitle}</h3>
      <p className="articleText__info">{text}</p>

      {buttonText && buttonNavigation && (
        <p className="articleText__btn">
          <Link
            className="action__button-global"
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
