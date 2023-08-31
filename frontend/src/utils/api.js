class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  _handleError(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._handleError);
  }

  getUserInfo(token) {
    return this._request("users/me", {
      headers: {
        "authorization": `Bearer ${token}`,
      }
    });
  }

  getCards(token) {
    return this._request("cards", {
      headers: {
        "authorization": `Bearer ${token}`,
      }
    });
  }

  editUserInfo(data, token) {
    return this._request("users/me", {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  editUserAvatar(data, token) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  addCard(data, token) {
    return this._request("cards", {
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        },
      body: JSON.stringify(data),
    });
  }

  deleteCard(id, token) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(id, isLiked, token) {
    if (isLiked) {
      return this.addLike(id, token);
    }
    return this.deleteLike(id, token);
  }

  addLike(id, token) {
    return this._request(`cards/${id}/likes`, {
      method: "PUT",
      headers:  {
        "authorization": `Bearer ${token}`,
      },
    });
  }

  deleteLike(id, token) {
    return this._request(`cards/${id}/likes`, {
      method: "DELETE",
      headers:  {
        "authorization": `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000/"
});

export default api;
