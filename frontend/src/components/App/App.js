import React from "react";
import { Route, Switch, useHistory, useRouteMatch, Redirect  } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import auth from "../../utils/Auth";
import { useFixLoadMovies } from "../../hooks/useFixLoadMovies";

import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import './App.css'


function App() {
  const history = useHistory();
  const { filterMovies, findSaveMovie } = useFixLoadMovies();
  const ls = window.localStorage;
  const { path } = useRouteMatch();

  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [error, setError] = React.useState('')

//изменение профиля
function handleUpdateUser(userInfo) {
  mainApi.setProfileInfo(userInfo)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      setError(err)
        const timerId = setTimeout(() => {
          setError(null)
          clearTimeout(timerId);
        }, 5000);
    });
}

function filterMoviesList (nameList) {
  const mainList = JSON.parse(ls.getItem(`${nameList}`))
  try {
    const list = filterMovies(mainList, nameList);
    findSaveMovie(list, savedMovies, currentUser.data._id);
    if (nameList === 'movies') setMovies(list);
    else setSavedMovies(list);
  } catch (err) {
    setError(err.messsage)
  }

}

// запросы для фильмов
function handleSearchMovies (type) {
  setError(null)
  if (ls.getItem("movies")) {
    filterMoviesList(type)
    return
  }
  setIsLoading(true)
  moviesApi.getMovies()
    .then((res) => {
      ls.setItem("movies", JSON.stringify(res))
      filterMoviesList(type)
    })
    .catch((err) => {
      setError(`Во время запроса произошла ошибка. Возможно, проблема с соединением или
      сервер недоступен. Подождите немного и попробуйте ещё раз`)
    })
    .finally(() => {
      setIsLoading(false)
    })
}

function handleSearchSavedMovies (type) {
  setError(null)
  setIsLoading(true)
  try {
    filterMoviesList(type)
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}

const handleMoviesLike = (movie) => {
  const isSaved = movie?.owner === currentUser.data._id;
  if (isSaved) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        movie.owner = null
        const newSavedMovies =  savedMovies.filter((m) => (m._id !== movie._id))
        const newMovies = movies.filter(m => {
          if (m.id === movie.movieId)  m.owner = null
          return m
        })
        setSavedMovies(newSavedMovies);
        ls.setItem("savedMovies", JSON.stringify(newSavedMovies))
        setMovies(newMovies)
        ls.setItem("resultSearch-movies", JSON.stringify(newMovies))
      })
      .catch((err) => {
        setError(err)
        const timerId = setTimeout(() => {
          setError(null)
          clearTimeout(timerId);
        }, 5000);
      });
  } else {
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        movie.owner = currentUser.data._id
        movie._id = newMovie._id;
        const arr = savedMovies.map(i => i)
        arr.push(newMovie)
        setSavedMovies(arr)
        ls.setItem("savedMovies", JSON.stringify(arr))
      })
      .catch((err) => {
        setError(err)
        const timerId = setTimeout(() => {
          setError(null)
          clearTimeout(timerId);
        }, 5000);
      });
  }
}

// авторизация
  function handleRegisterSubmit(password, email, name) {
    auth.register(password, email, name)
      .then((res) => {
        if (res.data.token) {
          setLoggedIn(true)
          history.push("/movies");
        }
      })
      .catch((err) => {
        setError(err)
        const timerId = setTimeout(() => {
          setError(null)
          clearTimeout(timerId);
        }, 5000);
      });
  }

  function handleLoginSubmit(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.data.token) {
          setLoggedIn(true)
          history.push("/movies");
        }
      })
      .catch((err) => {
        setError(err)
        const timerId = setTimeout(() => {
          setError(null)
          clearTimeout(timerId);
        }, 5000);
      });
  }

  function signOut() {
    auth.signout()
      .then(() => {
        history.push("/");
        setLoggedIn(false);
        localStorage.clear();
      })
      .catch((err) => {
        setError(err)
        const timerId = setTimeout(() => {
          setError(null)
          clearTimeout(timerId);
        }, 5000);
      })
  }

// получение данных при первом открытии страницы
function getContent () {
  setMovies([])
  if (localStorage.getItem("token")) {
    setLoggedIn(true);
    Promise.all([mainApi.getSavedMovies(), mainApi.getProfileInfo()])
    .then((res) => {
      setCurrentUser(res[1]);
      ls.setItem("savedMovies", JSON.stringify(res[0]))
      setSavedMovies(res[0]);
      if (ls.getItem("resultSearch-savedMovies")) setSavedMovies(JSON.parse(ls.getItem("resultSearch-savedMovies")));
      if (ls.getItem("resultSearch-movies")) {
        const list = findSaveMovie(JSON.parse(ls.getItem("resultSearch-movies")), res[0], res[1].data._id);
        setMovies(list)
      }
    })
    .catch((err) => {
      setError(err)
        const timerId = setTimeout(() => {
          setError(null)
          clearTimeout(timerId);
        }, 5000);
    });
  }
}

React.useEffect(() => {
  getContent();
}, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            exact path="/movies"
            loggedIn={loggedIn}
            movies={movies}
            handleMoviesLike={handleMoviesLike}
            error={error}
            isLoading={isLoading}
            handleSearchMovies={handleSearchMovies}
            component={Movies}
            location={path}
          >
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/saved-movies"
            loggedIn={loggedIn}
            movies={savedMovies}
            handleMoviesLike={handleMoviesLike}
            error={error}
            isLoading={isLoading}
            handleSearchMovies={handleSearchSavedMovies}
            component={SavedMovies}
            location={path}
          >
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute
           exact path="/profile"
           handleUpdateUser={handleUpdateUser}
           signOut={signOut}
           loggedIn={loggedIn}
           error={error}
           component={Profile}
           location={path}
          />
          <Route exact path="/signin">
            {!loggedIn ? <Login handleLoginSubmit={handleLoginSubmit}  error={error}/> : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/signup">
           {!loggedIn ? <Register handleRegisterSubmit={handleRegisterSubmit}  error={error}/> : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
            <Footer />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
