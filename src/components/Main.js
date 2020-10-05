import React from 'react';
import { api } from '../utils/api.js';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoadingState] = React.useState(true);

  React.useEffect(() => {
    // Загружаем данные с сервера
    Promise.all([api.getUserData(), api.getData()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      // Если данные не загрузились, используем тестовые данные
      .catch((err) => {
        alert(`${err}: Приложение работает в тестовом режиме!`);
      })
      .finally(() => {
        setLoadingState(false);
      })

  }, []);
    
  return (
    <main className="main page__narrow">
      { isLoading
      ? ( <div className="spinner spinner_visible" /> )
      : (
        <div className="content">
          <section className="profile">
            <div 
              className="profile__image"
              style={{ backgroundImage: `url(${ userAvatar })` }}
            >
              <button
                className="profile__avatar-button"
                aria-label="Редактировать"
                type="button"
                onClick={ onEditAvatar }
              />
            </div>
            <div className="profile__data">
              { /* Отключаем встроенное правило для следующей строки, чтобы консоль 
              не ругалась на отсутствие текста в заголовке 
              После заполнения поля это уже не нужно, но оставлю пока на память */ }
              {  /* eslint-disable-next-line */ }
              <h1 className="profile__name">{ userName }</h1>
              <button
                className="profile__edit-button page__button"
                aria-label="Редактировать"
                type="button"
                onClick={ onEditProfile }
              />
              <p className="profile__profession">{ userDescription }</p>
            </div>
            <button
              className="profile__add-button page__button"
              aria-label="Добавить"
              type="button"
              onClick={ onAddPlace }
            />
          </section>
          <section className="gallery">
            { cards.map(({ _id, ...card }) => (
              <Card key={ _id } { ...card } onCardClick={ onCardClick } />
            ))}
          </section>
        </div>
      )}
    </main>
  )
}

export default Main;
