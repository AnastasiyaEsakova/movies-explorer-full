import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies(props) {
  const [isShow, setIsShow] = React.useState(false)

  React.useEffect(() => {
    if (localStorage.getItem("resultSearch-savedMovies")) setIsShow(true)
  }, [props.movies])

  return (
    <div className="saved-movies">
      <Header>
        <Navigation type="savedMovies" loggedIn={props.loggedIn}/>
      </Header>
      <SearchForm type="savedMovies" handleSearchMovies={props.handleSearchMovies}/>
      {props.error ?
        <p className="saved-movies__text">{props.error}</p> :
        props.movies.length === 0 && isShow?  <p className="saved-movies__text">Ничего не найдено</p> : null
      }
      {props.isLoading ? <Preloader /> : <MoviesCardList type="savedMovies" list={props.movies}  handleMoviesLike={props.handleMoviesLike} /> }
    </div>

  );
}

export default SavedMovies;
