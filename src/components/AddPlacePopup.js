import React, { useState } from "react";
import FormInputWithError from "./FormInputWithError";
import FormSubmit from "./FormSubmit";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, onAddPlace }) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState(""); 

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: place,
      link,
    })
  }

  return (
    <PopupWithForm
    title="Новое место"
    name="add-card"
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <fieldset className="popup__fieldset">
    <FormInputWithError
      name="place"
      placeholder="Название"
      type="text"
      minLength="1"
      maxLength="30"
      value={place}
      onChange={handlePlaceChange}
    />
    <FormInputWithError
      name="link"
      placeholder="Ссылка на картинку"
      type="url"
      value={link}
      onChange={handleLinkChange}
    />
    </fieldset>
    <FormSubmit
      submitTitle="Создать"
      isSubmitActive={true}
    />
  </PopupWithForm>
  )
}

export default AddPlacePopup;