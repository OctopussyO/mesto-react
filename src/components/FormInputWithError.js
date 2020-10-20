import React from "react";

const FormInputWithError = React.memo(
  ({
    name,
    placeholder,
    type,
    minLength,
    maxLength,
    value,
    onChange,
    inputRef,
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
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
        <span className={`popup__error popup__error_in_${name}`} />
      </>
    );
  }
);

export default FormInputWithError;
