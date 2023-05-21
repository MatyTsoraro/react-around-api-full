function FieldForm(props) {
  return (
    <>
      <input
        className={`form__input auth__input ${
          props.isAuth ? "auth__input" : ""
        }${props.error ? "form__input_type_error auth__input" : ""}`}
        name={props.name}
        id={props.name}
        type={props.type === undefined ? "text" : props.type}
        aria-label={props.label}
        value={props.value}
        placeholder={props.label}
        minLength={props.minMax ? props.minMax[0] : undefined}
        maxLength={props.minMax ? props.minMax[1] : undefined}
        onChange={props.handleChange}
        autoComplete={
          props.type === "password" ? `around-us ${props.name}` : ""
        }
        required
      />
      <span
        className={`form__input-error ${
          props.error ? "form__input-error_visible" : ""
        }`}
      >
        {props.error}
      </span>
    </>
  );
}

export default FieldForm;
