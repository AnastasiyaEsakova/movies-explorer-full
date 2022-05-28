import React from "react";
import { useHistory } from "react-router-dom";
import './NotFound.css'

function NotFound() {
  const history = useHistory();

  return (
    <div className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__text">Страница не найдена</p>
        </div>
        <a className="not-found__link" onClick={() => history.goBack()}>Назад</a>
    </div>

  );
}

export default NotFound;
