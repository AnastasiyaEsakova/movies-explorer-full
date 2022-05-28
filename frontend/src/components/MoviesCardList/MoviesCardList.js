import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard ";
import { useFixLoadMovies } from "../../hooks/useFixLoadMovies";
import './MoviesCardList.css'

function MoviesCardList(props) {
  const [newMoviesList, setNewMoviesList] = React.useState([]);
  const [counter, setCounter] = React.useState(null);
  const { handleLoad, checkScreenWidth, numberOfMovies, numberOfAddMovies } = useFixLoadMovies();

  React.useEffect(() => {
    const handleResize = (e) => {
      setCounter(null)
      checkScreenWidth(e.target.innerWidth)
    }

    checkScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (!counter) setCounter(numberOfMovies)
    const list = handleLoad(props.list, counter);
    setNewMoviesList(list)
   }, [props.list, numberOfMovies, counter]);


  const handleLoadMoreMovies = () => {
    setCounter(counter + numberOfAddMovies)
  }


  return (
    <section className="movie-card-list">
      <div className="movie-card-list__container">
        { newMoviesList.map((movie) => {
          return (
            <MoviesCard type={props.type} movie={movie} key={movie.nameRU} handleMoviesLike={props.handleMoviesLike}/>
          )
        })}
      </div>
      { (props.list.length === newMoviesList.length ) ?  null : <button className="movie-card-list__button" onClick={handleLoadMoreMovies}>Ещё</button>}
    </section>

  );
}

export default MoviesCardList;
