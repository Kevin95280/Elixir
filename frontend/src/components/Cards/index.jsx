import { useTranslation } from "react-i18next";
import WineCardWrapper from "./WineCardWrapper";

const Cards = ({ cards, highlightId, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const groupedByType = cards.reduce((acc, card) => {
    acc[card.type] = acc[card.type] || [];
    acc[card.type].push(card);
    return acc;
  }, {});

  const typeColorMap = {
    Rouge: "text-red-700",
    Blanc: "text-yellow-600",
    Rosé: "text-pink-500",
    Pétillant: "text-amber-500",
    Autre: "text-gray-500"
  };

  return (
    <section id="wines" className="px-4 py-8 space-y-12">
      {Object.entries(groupedByType).map(([type, group]) => {
        const typeClass = typeColorMap[type] || "text-accent";

        return (
          <div key={type} className="space-y-4">
            <h2 className={`text-xl font-bold ${typeClass}`}>
              {t(`wineTypes.${type}`)}
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-6 justify-items-center">
              {group.map((card, index) => (
                <WineCardWrapper
                  key={card.id || `${type}-${index}`}
                  card={card}
                  highlightId={highlightId}
                  type={card.type}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Cards;

