export class Api {
  constructor() {
    this._token = process.env.TOKEN;
    this._baseUrl = "https://around-api.en.tripleten-services.com/v1";
    this._headers = {
      authorization: this._token,
      "Content-type": "application/json",
    };
  }
  _request(endpoint, options = {}) {
    const finalOPtions = {
      headers: this._headers,
      ...options,
    };
    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, finalOPtions).then(this._checkResponse);
  }

  getAppInfo() {
    //call get user info in array
    return Promise.all([this.getUserInfo(), this.getAllCards()]);
  }

  getAllCards() {
    return this._request("/cards", { method: "GET" });
  }

  createCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: "DELETE" });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: "PUT" });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: "DELETE" });
  }

  getUserInfo() {
    return this._request("/users/me", { method: "GET" });
  }

  editUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateUserAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
