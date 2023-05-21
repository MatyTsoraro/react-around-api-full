import React, { useState } from "react";
import { Link } from "react-router-dom";

import FieldForm from "./FieldForm";

function Login({ handleLogin, isLoading }) {
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
    handleLogin(values).catch(() => {
      setValues({ ...values, password: "" });
      setReadyToSubmit(false);
    });
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Log in</h1>
      <form className="auth__form" onSubmit={handleSubmit} name="login-form">
        <FieldForm
          type="email"
          name="login-email"
          label="Email"
          value={values.email}
          error={errors.email}
          handleChange={handleChange}
        />

        <FieldForm
          type="password"
          name="login-password"
          label="Password"
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
              {isLoading ? "Loading..." : "Log in"}
            </button>

            <p className="auth__footer-subtitle">
              Not a member yet?{" "}
              <Link to="/signup" className="auth__footer-link">
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
