import React, { useEffect, useState } from "react";
import FormSubmit from "./FormSubmit";

function PopupWithForm({
  title,
  name,
  children,
  onClose,
  onSubmit,
  submitTitle,
  submitLoadingTitle,
  isSubmitActive,
}) {
  // Определяем, нажата ли кнопка отправки формы для подстановки загрузочного текста
  const [isSubmitted, setSubmitState] = useState(false);

  // Обработчик клика по оверлею
  const handleOverlayPopupClick = (evt) => {
    if (!evt.target.closest(".popup__container")) {
      onClose();
    }
  };

  // Обработчик нажатия клавиши "Escape"
  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState(true);
    onSubmit();
  };

  // Используем хук эффекта для закрытия модалки по нажатию клавиши "Escape"
  useEffect(() => {
    document.body.addEventListener("keydown", handleEscape);
    return () => {
      document.body.removeEventListener("keydown", handleEscape);
    };
  });

  return (
    <div
      className={`popup popup_act_${name} popup_active`}
      onMouseDown={handleOverlayPopupClick}
    >
      <form
        action="#"
        className="popup__container popup__container_with_form"
        name={name}
        method="GET"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="popup__heading">{title}</h2>
        {children}
        <FormSubmit
          submitTitle={submitTitle}
          loadingTitle={submitLoadingTitle}
          isActive={isSubmitActive}
          isClicked={isSubmitted}
        />
        <button
          className="popup__close-button page__button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </form>
    </div>
  );
}

export default PopupWithForm;
