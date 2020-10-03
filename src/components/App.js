import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main />
        <Footer />
      </div>
      <div className="popup popup_act_edit-profile">
        <form action="#" className="popup__container popup__container_with_form" name="edit-form" method="GET" noValidate>
          <fieldset className="popup__fieldset">
            <legend className="popup__heading">Редактировать профиль</legend>
            <input className="popup__input popup__input_valid" 
              name="name" placeholder="Имя" required type="text" minLength="2" maxLength="40" autoComplete="off" />
            <span className="popup__error popup__error_in_name" />
            <input className="popup__input popup__input_valid"
              name="info" placeholder="Профессия" required type="text" minLength="2" maxLength="200" autoComplete="off" />
            <span className="popup__error popup__error_in_info" />
          </fieldset>
          <button className="popup__save-button popup__save-button_unblocked" type="submit">Сохранить</button>
          <button className="popup__close-button page__button" type="button" aria-label="Закрыть" />
        </form>
      </div>
      <div className="popup popup_act_add-card">
        <form action="#" className="popup__container popup__container_with_form" name="add-form" method="GET" noValidate>
          <fieldset className="popup__fieldset">
            <legend className="popup__heading">Новое место</legend>
            <input className="popup__input popup__input_valid"
              name="place" placeholder="Название" required type="text" minLength="1" maxLength="30" autoComplete="off" />
            <span className="popup__error popup__error_in_place" />
            <input className="popup__input popup__input_valid"
              name="link" placeholder="Ссылка на картинку" required type="url" autoComplete="off" />
            <span className="popup__error popup__error_in_link" />
          </fieldset>
          <button className="popup__save-button popup__save-button_blocked" disabled type="submit">Создать</button>
          <button className="popup__close-button page__button" type="button" aria-label="Закрыть" />
        </form>
      </div>
      <div className="popup popup_act_enlarge-image">
        <figure className="popup__container">
          <img className="popup__image" src="#" alt="#" />
          <figcaption>
            <p className="popup__image-caption" />
            <button className="popup__close-button page__button" type="button" aria-label="Закрыть" />
          </figcaption>
        </figure>
      </div>
      <div className="popup popup_act_confirm">
        <form action="#" className="popup__container popup__container_with_form" name="confirm-form" method="GET" noValidate>
          <h2 className="popup__heading">Вы уверены?</h2>
          <button className="popup__save-button popup__save-button_unblocked" type="submit">Да</button>
          <button className="popup__close-button page__button" type="button" aria-label="Закрыть" />
        </form>
      </div>
      <div className="popup popup_act_edit-avatar">
        <form action="#" className="popup__container popup__container_with_form" name="avatar-form" method="GET" noValidate>
          <fieldset className="popup__fieldset">
            <legend className="popup__heading">Обновить аватар</legend>
            <input className="popup__input popup__input_valid"
              name="avatar" placeholder="Ссылка на аватар" required type="url" autoComplete="off" />
            <span className="popup__error popup__error_in_avatar" />
          </fieldset>
          <button className="popup__save-button popup__save-button_blocked" disabled type="submit">Сохранить</button>
          <button className="popup__close-button page__button" type="button" aria-label="Закрыть" />
        </form>
      </div>
    </div>
  );
}

export default App;
