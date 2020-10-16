import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

const getInputTemplate = ({
  name,
  placeholder,
  type,
  minLength,
  maxLength,
}) => {
  return (
    <>
      <input
        className="popup__input popup__input_valid"
        name={name}
        placeholder={placeholder}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        required
        autoComplete="off"
      />
      <span className="popup__error popup__error_in_name" />
    </>
  );
};

const getSubmitTemplate = (submitTitle, isSubmitActive) => {
  return (
    <button
      className={`popup__save-button ${
        isSubmitActive
          ? "popup__save-button_unblocked"
          : "popup__save-button_blocked"
      }`}
      disabled={!isSubmitActive}
      type="submit"
    >
      {submitTitle}
    </button>
  );
};

function App() {
  // Используем хуки состояния для открытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setEditAvatarPopupState(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupState(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupState(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupState(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setImagePopupState(false);
  };

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        {/* Пробрасываем обработчики клика */}
        <Main
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__fieldset">
          {getInputTemplate({
            name: "name",
            placeholder: "Имя",
            type: "text",
            minLength: "2",
            maxLength: "40",
          })}
          {getInputTemplate({
            name: "info",
            placeholder: "Профессия",
            type: "text",
            minLength: "2",
            maxLength: "200",
          })}
        </fieldset>
        {getSubmitTemplate("Сохранить", false)}
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__fieldset">
          {getInputTemplate({
            name: "place",
            placeholder: "Название",
            type: "text",
            minLength: "1",
            maxLength: "30",
          })}
          {getInputTemplate({
            name: "link",
            placeholder: "Ссылка на картинку",
            type: "url",
          })}
        </fieldset>
        {getSubmitTemplate("Создать", false)}
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__fieldset">
          {getInputTemplate({
            name: "avatar",
            placeholder: "Ссылка на аватар",
            type: "url",
          })}
        </fieldset>
        {getSubmitTemplate("Сохранить", false)}
      </PopupWithForm>
      <ImagePopup
        isOpen={isImagePopupOpen}
        place={selectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        // isOpen={ isConfirmPopupOpen }
        // onClose={ closeAllPopups }
      >
        {getSubmitTemplate("Да", true)}
      </PopupWithForm>
    </div>
  );
}

export default App;
