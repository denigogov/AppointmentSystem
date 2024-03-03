import "../styling/_loading.scss";
import TextAnimation from "./TextAnimation";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <div className="loading__container">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <div>
          <TextAnimation />
        </div>
      </div>
    </div>
  );
};

export default Loading;
