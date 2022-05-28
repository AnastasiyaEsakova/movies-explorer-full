export class MoviesApi{
    constructor(options){
      this._headers = options.headers;
      this._baseUrl = options.baseUrl;
      this._handleReturnPromise = ((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Произошла ошибка: ${res.status} :(`);
      });
    }

    getMovies(){
      return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    })
    .then((res) => this._handleReturnPromise(res));
    }
  }

  const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  export default moviesApi;
