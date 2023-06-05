class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getFormProperties() {
    return fetch(`${this._baseUrl}/getProps`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  generateVideo(userData) {
    return fetch(`${this._baseUrl}/generateVideo`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
