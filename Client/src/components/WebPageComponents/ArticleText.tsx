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
  observerIntersepcting: (node?: Element | null) => void;
}

/**
 * ArticleText Component
 *
 * Renders a styled article text block with optional title, subtitle, text, and button.
 *
 * @param title The main title of the article.
 * @param subTitle The subtitle of the article.
 * @param subTitleHighLight Highlighted text within the subtitle.
 * @param additionalSubTitle Additional subtitle text.
 * @param additionalSubTitleColor Color for additional MARKED subtitle text.
 * @param text The main content text of the article.
 * @param additionalClassName Additional CSS class names for customization.
 * @param buttonText Text for the optional button.
 * @param buttonNavigation URL for the optional button's navigation.
 * @param additionalBtnStyle Additional CSS class for button customization.
 * @param observerIntersepcting Callback function to handle intersection observer events.
 * @returns A styled article text block with optional button, based on provided props.
 */
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
  observerIntersepcting,
}) => {
  return (
    <div
      ref={observerIntersepcting}
      className={`${additionalClassName} articleText `}
    >
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
