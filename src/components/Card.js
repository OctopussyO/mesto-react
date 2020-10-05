import React from 'react';

function Card({ name, link, likes, onCardClick }) {
  const handleClick = () => {
    onCardClick({ name, link });
  }

  return (
    <figure className="card">
      <button className="card__button card__button_act_delete page__button" type="button" aria-label="Удалить">
        <svg width="18" height="20" fill="#fff" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.458 18.142c.06.67.61 1.158 1.28 1.158H14.26c.67 0 1.22-.508 1.28-1.158L16.72 
          5.79H1.28l1.178 12.352zM16.72 1.93h-5.14v-.65C11.58.569 11.011 0 10.3 0H7.72C7.01 0 6.44.569 
          6.44 1.28v.65H1.28C.569 1.93 0 2.499 0 3.21c0 .711.569 1.28 1.28 1.28h15.44c.711 0 1.28-.569 
          1.28-1.28 0-.711-.569-1.28-1.28-1.28z" />
        </svg>
      </button>
      <button 
        className="card__button card__button_act_enlarge-image"
        type="button"
        aria-label="Увеличить"
        onClick={ handleClick }
      >
        <img className="card__image" src={ link } alt={`${ name }, фотография`} />
      </button>
      <figcaption className="card__description">
        <h2 className="card__heading">{ name }</h2>
        <div className="card__likes">
          <button className="card__button card__button_act_like page__button" type="button" aria-label="Нравится">
            <svg width="20" height="18" viewBox="-1 -1 23 19" stroke="black" strokeWidth="1.5" 
                xmlns="http://www.w3.org/2000/svg">
              <path d="M19.154 9.338c2.14-2.14 2.14-5.614 0-7.733a5.486 5.486 0 00-7.755 0l-1.038 
              1.06-1.038-1.039C7.183-.535 3.708-.535 1.589 1.605A5.43 5.43 0 000 5.482c0 1.462.572 
              2.84 1.59 3.877l8.771 8.772 8.793-8.793z"/>
            </svg>
          </button>
          <span className="card__likes_quantity">{ likes.length }</span>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card;