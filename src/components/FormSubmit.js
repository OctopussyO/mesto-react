import React from "react";

const FormSubmit = React.memo(({submitTitle, isSubmitActive}) => {
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
})

export default FormSubmit;
