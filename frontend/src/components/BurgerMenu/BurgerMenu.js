import React from "react";
import { Link } from "react-router-dom";
import './BurgerMenu.css'

function BurgerMenu(props) {

  return (
    <div className="burger-menu">
      <div className={`burger-menu__box ${props.isOpenMenu ? 'burger-menu__box_active' : ''}`} onClick={props.handleOpenMenu}>
        <span className={`burger-menu__item ${props.isOpenMenu ? 'burger-menu__item_active' : ''}`}></span>
      </div>
      <nav className={`burger-menu__container ${props.isOpenMenu ? 'burger-menu__container_active' : ''}`}>
        <Link to="/" className="burger-menu__link" >Главная</Link>
        <Link to="/movies" className={`burger-menu__link ${props.type === 'movies' ? 'burger-menu__link_active' : ''}`} >Фильмы</Link>
        <Link to="/saved-movies" className={`burger-menu__link ${props.type === 'savedMovies' ? 'burger-menu__link_active' : ''}`}>Сохранённые фильмы</Link>
        <Link to="/profile" className="burger-menu__link burger-menu__link_theme_gray">Аккаунт</Link>
      </nav>
    </div>

  );
}

export default BurgerMenu;
