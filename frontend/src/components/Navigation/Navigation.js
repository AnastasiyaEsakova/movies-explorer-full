import React from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import './Navigation.css'

function Navigation(props) {
  const [isOpenMenu, setisOpenMenu] = React.useState(false);

  const moviesClass = `navigation__link navigation__link_type_movies
  ${props.type === 'movies' ? 'navigation__link_type_checked' : ''}`
  const sevedMoviesClass = `navigation__link navigation__link_type_movies
  ${props.type === 'savedMovies' ? 'navigation__link_type_checked' : ''}`

  const handleOpenMenu = () => {
    setisOpenMenu(!isOpenMenu)
  }

  return (
    <div className="navigation">
      { props.loggedIn ?
      <nav className="navigation__container">
      <BurgerMenu handleOpenMenu={handleOpenMenu} isOpenMenu={isOpenMenu} type={props.type} />
        <Link to="/movies" className={moviesClass} >Фильмы</Link>
        <Link to="/saved-movies" className={sevedMoviesClass}>Сохранённые фильмы</Link>
        <Link to="/profile" className="navigation__button-link navigation__button-link_theme_gray">Аккаунт</Link>
    </nav> :
        <nav className="navigation__container">
          <Link to="/signup" className="navigation__link">Регистрация</Link>
          <Link to="/signin" className="navigation__button-link navigation__button-link_theme_green">Войти</Link>
        </nav>
      }
    </div>

  );
}

export default Navigation;
