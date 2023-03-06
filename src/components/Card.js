import React from "react";

function Card({card, onCardClick}) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <li key={card._id} className="elements__item">
      <img className="elements__image" 
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="elements__card-container">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            aria-label="Поставить лайк"
            className="elements__like"
          />
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button className="elements__button-remove" />
    </li>
  );
}

export default Card;