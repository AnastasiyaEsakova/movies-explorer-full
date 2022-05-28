import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import './Register.css'

function Register(props) {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <div className="register__link"></div>
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <AuthForm title={['E-mail', 'Пароль', 'Имя']} buttonText="Зарегистрироваться" submit={props.handleRegisterSubmit} error={props.error}>
          <div className="auth__button-info">
            <p className="auth__text">Уже зарегистрированы?</p>
            <Link to="/signin" className="auth__link">
              Войти
            </Link>
          </div>
        </AuthForm>
      </div>
    </section>

  );
}

export default Register;
