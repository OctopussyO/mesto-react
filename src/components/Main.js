import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api.js";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  // Переменная состояния для загрузки (показываем/убираем спиннер)
  const [isLoading, setLoadingState] = useState(true);
  
  const userData = useContext(CurrentUserContext);
  const userName = userData.name;
  const userDescription = userData.about;
  const userAvatar = userData.avatar;
  
  const [cards, setCards] = useState([]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === userData._id);
    const handleLikeClick = isLiked ? api.unlikeItem.bind(api) : api.likeItem.bind(api);
    handleLikeClick(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map(cardItem => cardItem._id === card._id ? newCard : cardItem);
        setCards(newCards);
      })
  }

  useEffect(() => {
    // Загружаем данные с сервера
    api.getData()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {

      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  return (
    <main className="main page__narrow">
      {isLoading ? (
        <div className="spinner spinner_visible" />
      ) : (
        <div className="content">
          <section className="profile">
            <div
              className="profile__image"
              style={{ backgroundImage: `url(${userAvatar})` }}
            >
              <button
                className="profile__avatar-button"
                aria-label="Редактировать"
                type="button"
                onClick={onEditAvatar}
              />
            </div>
            <div className="profile__data">
              {/* Отключаем встроенное правило для следующей строки, чтобы консоль 
              не ругалась на отсутствие текста в заголовке 
              После заполнения поля это уже не нужно, но оставлю пока на память */}
              {/* eslint-disable-next-line */}
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__edit-button page__button"
                aria-label="Редактировать"
                type="button"
                onClick={onEditProfile}
              />
              <p className="profile__profession">{userDescription}</p>
            </div>
            <button
              className="profile__add-button page__button"
              aria-label="Добавить"
              type="button"
              onClick={onAddPlace}
            />
          </section>
          <section className="gallery">
            {cards.map((card) => (
              <Card key={card._id} {...card} onCardClick={onCardClick} onCardLike={handleCardLike}/>
            ))}
          </section>
        </div>
      )}
    </main>
  );
}

export default Main;
