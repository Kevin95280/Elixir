import { useEffect, useState } from "react";
import Card from "../Card";

function WineCardWrapper({ card, highlightId, type, index, onEdit, onDelete }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (card.id === highlightId) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, card.id]);

  return (
    <div className={`bubbly ${animate ? "animate" : ""} bubble-${type}`}>
      <div className="bubbly-left"></div>
      <div className="bubbly-right"></div>

      <Card
        id={card.id}
        index={index}
        isHighlighted={card.id === highlightId}
        onEdit={() => onEdit(card)}
        onDelete={() => onDelete(card.id)}
        link={card.link}
        name={card.name}
        year={card.year}
        owner={card.owner}
        type={card.type}
        img={card.img}
        alt={card.alt}
      />
    </div>
  );
}

export default WineCardWrapper;




