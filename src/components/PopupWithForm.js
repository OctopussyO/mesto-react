import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose }) {
  // Обработчик клика по оверлею
  const handleOverlayPopupClick = (evt) => {
    if (!evt.target.closest('.popup__container')) {
      onClose();
    }
  }
  
  // Обработчик нажатия клавиши "Escape"
  const handleEscape = (evt) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }  

  // Используем хук эффекта для закрытия модалки по нажатию клавиши "Escape"
  React.useEffect(() => {
    document.body.addEventListener('keydown', handleEscape);
    return () => {
      document.body.removeEventListener('keydown', handleEscape);
    }
  })

  return (
    <div className={`popup popup_act_${name}${ isOpen ? ' popup_active' : '' }`}
      onMouseDown={ handleOverlayPopupClick }
    >
      <form 
        action="#"
        className="popup__container popup__container_with_form"
        name={name}
        method="GET" 
        noValidate
      >
        <h2 className="popup__heading">{title}</h2>
        {children}
        <button 
          className="popup__close-button page__button" 
          type="button" 
          aria-label="Закрыть"
          onClick={ onClose }
        />
      </form>
    </div>
  );
}

export default PopupWithForm;
