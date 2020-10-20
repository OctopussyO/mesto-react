import React from "react";
import FormSubmit from "./FormSubmit";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ deletedCard, onConfirmDelete, onClose }) {
  const handleSubmit = () => {
    onConfirmDelete(deletedCard);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <FormSubmit submitTitle="Да" isSubmitActive={true} />
    </PopupWithForm>
  );
}

export default ConfirmPopup;
