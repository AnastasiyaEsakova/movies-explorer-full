import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css'

function Movies(props) {
  const [isShow, setIsShow] = React.useState(false)

  React.useEffect(() => {
    if (localStorage.getItem("resultSearch-movies")) setIsShow(true)
  }, [props.movies])

  return (
    <div className="movies">
     <Header>
       <Navigation type="movies" loggedIn={props.loggedIn}/>
     </Header>
     <SearchForm type="movies" handleSearchMovies={props.handleSearchMovies}/>
    {props.error ?
    <p className="saved-movies__text">{props.error}</p> :
    props.movies.length === 0 && isShow?  <p className="saved-movies__text">Ничего не найдено</p> : null
    }
    {props.isLoading ? <Preloader /> : <MoviesCardList list={props.movies} type="movies" handleMoviesLike={props.handleMoviesLike}/> }
    </div>

  );
}

export default Movies;
