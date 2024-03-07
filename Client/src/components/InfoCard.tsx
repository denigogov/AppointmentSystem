import "../styling/_infoCard.scss";
import { CardsDataTypes } from "./WebPageComponents/OurServices";

interface InfoCardProps {
  cardsData: CardsDataTypes[];
}

const InfoCard: React.FC<InfoCardProps> = ({ cardsData }) => {
  return (
    <div className="infoCard">
      {cardsData.map((card, i) => (
        <span className={`card ${card.className}`} key={i}>
          <div className="overlay"></div>
          <div className="circle">
            <img src={card.svg} alt={card.title} />
          </div>

          <p>{card.title ?? ""}</p>
        </span>
      ))}
    </div>
  );
};

export default InfoCard;
