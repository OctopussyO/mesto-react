import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { getInputTemplate, getSubmitTemplate } from '../utils/utils';

function App() {
  // Используем хуки состояния для открытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: ""
  });

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

  const handleUpdateUser = (userData) => {
    api.saveUserData(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
  }

  useEffect(() => {
    api.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
        <EditProfilePopup       
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
