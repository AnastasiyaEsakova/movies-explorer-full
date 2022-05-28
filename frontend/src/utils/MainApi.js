export class MainApi{
  constructor(options){
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
    this._handleReturnPromise = ((res) => {
      if(res.ok){
        return res.json();
      }
      return res.json()
      .then(data => {
        const message = data.message || res.statusText
        return Promise.reject(message, ':(');
      })
    });
  }

  /**Movies */
  getSavedMovies(){
    return fetch(`${this._baseUrl}/movies`, {
    headers: this._headers,
    credentials: 'include',
  })
  .then((res) => this._handleReturnPromise(res))
  }

  saveMovie(data){
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id,
    } = data;
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        movieId: String(id),
      })
    })
    .then((res) => this._handleReturnPromise(res));
  }

  deleteMovie(movieId){
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._handleReturnPromise(res));
  }

  //**Profile */
  getProfileInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._handleReturnPromise(res));
  }

  setProfileInfo(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then((res) => this._handleReturnPromise(res));
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://api.movies.esakova.nomoredomains.work',
  baseUrl: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default mainApi;
