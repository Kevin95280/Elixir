import { useEffect, useState } from 'react';

const Card = ({
  className = "",
  name,
  year,
  owner,
  link,
  img,
  alt,
  index,
  isHighlighted,
  onEdit,
  onDelete
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Si c'est la carte ajoutée → pas de délai
    if (isHighlighted) {
      setIsVisible(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, Math.sqrt(index) * 500); // Délai basé sur l'index

    return () => clearTimeout(timeout);
  }, [index, isHighlighted]);

  const getDelayClass = (index) => {
    const delays = ["delay-75", "delay-100", "delay-150", "delay-200", "delay-300"];
    return delays[index % delays.length];
  };

  return (
    <div className="relative group"> 
      {/* Icône crayon (visible uniquement au hover) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // évite d'ouvrir le lien
          onEdit();
        }}
        className="
          absolute top-0 right-8 z-10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-black/60 text-white p-1 rounded-full
          hover:bg-black
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.125 19.688 3 21l1.312-4.125L16.862 3.487z"
          />
        </svg>
      </button>

      {/* Icône suppression (visible uniquement au hover) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // évite d'ouvrir le lien
          onDelete(); // fonction passée depuis le parent
        }}
        className="
          absolute top-0 right-0 z-10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-black/60 text-white p-1 rounded-full
          hover:bg-black
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* La card cliquable */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ maxHeight: '350px', width: 'auto', maxWidth: '200px' }}
        className={`
          w-[225px] h-[250px] flex flex-col justify-between bg-muted rounded-lg 
          overflow-hidden shadow-md hover:scale-105 transform transition-all duration-500 ease-in-out
          ${isVisible ? `animate-fade-in-up ${getDelayClass(index)}` : 'opacity-0'}
          ${className}
        `}
      >
        <div className="h-[120px] overflow-hidden bg-background flex items-center justify-center">
          <img
            src={img}
            alt={alt}
            style={{ maxHeight: '300px', width: 'auto', maxWidth: '300px' }}
            className="object-contain mx-auto"
          />
        </div>

        <div className="h-[130px] p-3 text-text flex flex-col justify-between">
          {/* Nom */}
          <h3 className="text-sm font-semibold">
            {name.length > 20 ? name.slice(0, 20) + "…" : name}
          </h3>

          {/* Propriétaire (si présent) */}
          {owner && (
            <p className="text-xs text-gray-500">
              {owner.length > 25 ? owner.slice(0, 25) + "…" : owner}
            </p>
          )}

          {/* Année (seulement si valide) */}
          {year && year !== 0 && (
            <h4 className="text-xs text-gray-400">{year}</h4>
          )}
        </div>
      </a>
    </div>
  );
};

export default Card;

