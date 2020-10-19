import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import FormInputWithError from "./FormInputWithError";
import FormSubmit from "./FormSubmit";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  const setCurrentUserData = (currentUser) => {
    setName(currentUser.name);
    setInfo(currentUser.about);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: info,
    });
  }

  // Чтобы при закрытии попапа после редактирования без сохранения
  // сначала закрывалось окно, а потом менялись данные
  const handleClose = () => {
    onClose();
    setTimeout(setCurrentUserData, 1000, currentUser);
  }
  
  useEffect(() => {
    setCurrentUserData(currentUser);
  }, [currentUser])

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <FormInputWithError
          name="name"
          placeholder="Имя"
          type="text"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <FormInputWithError
          name="info"
          placeholder="Профессия"
          type="text"
          minLength="2"
          maxLength="200"
          value={info}
          onChange={handleInfoChange}
        />
      </fieldset>
      <FormSubmit submitTitle="Сохранить" isSubmitActive={true} />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
