import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import './AuthForm.css';

function AuthForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmit, setIsSubmit] = React.useState(false);
  const { handleChange, errors, isValid, resetForm, setIsValid} = useFormAndValidation();

  React.useEffect(() => {
    setIsSubmit(false)
    resetForm();
    setIsValid(true);
  }, []);

  React.useEffect(() => {
    setIsSubmit(false)
    resetForm();
    setIsValid(true);
  }, [props.error]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    handleChange(e);
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    handleChange(e);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    handleChange(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return
    setIsSubmit(true)
    if (props.title.length === 3) {
      if (!name && !password && !email) return
      props.submit(password, email, name)
    } else {
      if (!password && !email) return
      props.submit(password, email)
    }
  }


  return (
    <div className="auth">
      <form
        className="auth__form"
        name={props.name}
        onSubmit={handleSubmit}
      >
      {props.title.length === 3 ?
        <>
          <label className="auth__title" htmlFor="name">{props.title[2]}</label>
          <input
            id="name"
            className={`auth__input ${ errors.name ? 'auth__input_type_error' : ''}`}
            name="name"
            type="text"
            onChange={handleChangeName}
            value={name || ""}
            minLength="2"
            required
            disabled={isSubmit}
          />
          <span
            className={`auth__error ${ errors.name ? "auth__error_visible" : "" }`}
            id="name-error"
          >
            {errors.name}
          </span>
          <label className="auth__title" htmlFor="email">{props.title[0]}</label>
          <input
            id="email"
            className={`auth__input ${ errors.email ? 'auth__input_type_error' : ''}`}
            name="email"
            type="email"
            onChange={handleChangeEmail}
            value={email || ""}
            minLength="2"
            required
            disabled={isSubmit}
          />
          <span
            className={`auth__error ${ errors.email ? "auth__error_visible" : "" }`}
            id="email-error"
          >
            {errors.email}
          </span>
          <label className="auth__title" htmlFor="password">{props.title[1]}</label>
          <input
            id="password"
            className={`auth__input ${ errors.password ? 'auth__input_type_error' : ''}`}
            name="password"
            type="password"
            onChange={handleChangePassword}
            value={password || ""}
            minLength="7"
            required
            disabled={isSubmit}
          />
          <span
            className={`auth__error ${ errors.password ? "auth__error_visible" : "" }`}
            id="password-error"
          >
            {errors.password}
          </span>
        </>  :
        <>
          <label className="auth__title" htmlFor="email">{props.title[0]}</label>
          <input
            id="email"
            className={`auth__input ${ errors.email ? 'auth__input_type_error' : ''}`}
            name="email"
            type="email"
            onChange={handleChangeEmail}
            value={email || ""}
            minLength="2"
            required
            disabled={isSubmit}
          />
          <span
            className={`auth__error ${ errors.email ? "auth__error_visible" : "" }`}
            id="email-error"
          >
            {errors.email}
          </span>
          <label className="auth__title" htmlFor="password">{props.title[1]}</label>
          <input
            id="password"
            className={`auth__input ${ errors.password ? 'auth__input_type_error' : ''}`}
            name="password"
            type="password"
            onChange={handleChangePassword}
            value={password || ""}
            minLength="7"
            required
            disabled={isSubmit}
          />
          <span
            className={`auth__error ${ errors.password ? "auth__error_visible" : "" }`}
            id="password-error"
           >
            {errors.password}
          </span>
        </>
      }
        <div className="auth__button-container">
          <p className="auth__button-error">{props.error}</p>
          <button className={`auth__button ${!isValid ? 'auth__button_disable' : '' }`}>{props.buttonText}</button>
          {props.children}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
