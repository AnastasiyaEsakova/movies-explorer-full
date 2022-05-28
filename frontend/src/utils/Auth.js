export class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    this._handleReturnPromise = (res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json()
      .then(data => {
        const message = data.message || res.statusText
        return Promise.reject(message, ':(');
      })
    };
  }
  register = (password, email, name) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ password, email, name }),
    })
      .then((res) => this._handleReturnPromise(res))
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        return res;
      });
  }
  authorize = (password, email) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._handleReturnPromise(res))
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        return res;
      });
  };
  signout = () => {
    return fetch(`${this._baseUrl}/signout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
      .then((res) => this._handleReturnPromise(res))
      .then((data) => data);
  };
}
const auth = new Auth("http://localhost:8080");
export default auth;
