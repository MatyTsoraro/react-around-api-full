import React, { useState } from "react";
import { Link } from "react-router-dom";

import FieldForm from "./FieldForm";

function Register({ handleRegister, isLoading }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  function handleChange(evt) {
    const name = evt.target.name.split("-").pop();
    setValues({ ...values, [name]: evt.target.value });

    if (evt.target.validity.valid) {
      const errorsUpdated = { ...errors, [name]: "" };
      setErrors(errorsUpdated);
      const errorsValue = Object.values(errorsUpdated);

      if (errorsValue.length === 2)
        setReadyToSubmit(!errorsValue.some((i) => i));
      // If both fields were checked and there is no error, enable submitting
    } else {
      setErrors({ ...errors, [name]: evt.target.validationMessage });
      setReadyToSubmit(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Sign up</h1>
      <form className="auth__form" onSubmit={handleSubmit} name="register-form">
        <FieldForm
          type="email"
          name="signup-email"
          label="Email"
          minMax={[5, 320]}
          value={values.email}
          error={errors.email}
          handleChange={handleChange}
        />

        <FieldForm
          type="password"
          name="sign-password"
          label="Password"
          minMax={[10, 255]}
          value={values.password}
          error={errors.password}
          handleChange={handleChange}
        />

        <div className="auth__footer">
          <div className="auth__footer-overlay">
            <button
              className={`auth__button ${
                readyToSubmit ? "" : "form__button_disabled"
              }`}
              type="submit"
              name="login-submit"
            >
              {isLoading ? "Loading..." : "Sign up"}
            </button>

            <p className="auth__footer-subtitle">
              Already a member?{" "}
              <Link to="/signin" className="auth__footer-link">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
