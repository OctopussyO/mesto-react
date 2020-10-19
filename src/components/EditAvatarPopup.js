import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import FormInputWithError from "./FormInputWithError";
import FormSubmit from "./FormSubmit";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState("");

  const handleAvatarChange = () => {
    setAvatar(avatarRef.current.value)
  }

  const clearInputValue = () => {
    setAvatar("");
  }

  // Чтобы при закрытии попапа после редактирования без сохранения
  // сначала закрывалось окно, а потом менялись данные
  const handleClose = () => {
    onClose();
    setTimeout(clearInputValue, 500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onUpdateAvatar({
      avatar: avatar,
    });
    setTimeout(clearInputValue, 500);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <FormInputWithError 
          name="avatar"
          placeholder="Ссылка на аватар"
          type="url"
          value={avatar}
          inputRef={avatarRef}
          onChange={handleAvatarChange}
        />
      </fieldset>
      <FormSubmit submitTitle="Сохранить" isSubmitActive={true} />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
