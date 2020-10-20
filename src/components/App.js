import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";

import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { getInputTemplate, getSubmitTemplate } from "../utils/utils";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  // Переменная состояния для загрузки (показываем/убираем спиннер)
  const [isLoading, setLoadingState] = useState(true);

  // Используем хуки состояния для открытия/закрытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);

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

  // Стейт-переменные для текущего состояния страницы
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);
  
  //Обработчики для попапов
  const handleUpdateUser = (userData) => {
    api.saveUserData(userData).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    });
  };
  
  const handleUpdateAvatar = (data) => {
    api.saveUserAvatar(data).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    });
  };
  
  const handleAddPlace = (newCard) => {
    api.saveNewItem(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .finally(() => {
        closeAllPopups();
      });
  };
    
    
  // Обработчики для карточек
  const handleCardLike = (isLiked, card) => {
    const handleLikeClick = isLiked
      ? api.unlikeItem.bind(api)
      : api.likeItem.bind(api);
    handleLikeClick(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((cardItem) =>
        cardItem._id === card._id ? newCard : cardItem
      );
      setCards(newCards);
    });
  };

  const handleCardDelete = (card) => {
    api.deleteItem(card._id)
    .then(() => {
      const newCards = cards.filter(cardItem => cardItem._id !== card._id);
      setCards(newCards);
    })
  };

  useEffect(() => {
    api
    .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      });
  }, []);

  useEffect(() => {
    api
      .getData()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          {/* Пробрасываем обработчики клика */}
          {isLoading ? (
            <div className="spinner spinner_visible" />
          ) : (
            <div className="content">
              <Main
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </div>
          )}
          <Footer />
        </div>
        {isEditProfilePopupOpen && (
          <EditProfilePopup
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}
        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}
        {isAddPlacePopupOpen && (
          <AddPlacePopup 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
        )}
        {isImagePopupOpen && (
          <ImagePopup
            isOpen={isImagePopupOpen}
            place={selectedCard}
            onClose={closeAllPopups}
          />
        )}
        {/* {isConfirmPopupOpen && (
          <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            onClose={ closeAllPopups }
          >
            {getSubmitTemplate("Да", true)}
          </PopupWithForm>
        )} */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
