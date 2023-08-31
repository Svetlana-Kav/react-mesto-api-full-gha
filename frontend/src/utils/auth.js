export const BASE_URL = "http://localhost:3000"; //заменить на доменное имя бэка

function handleError(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return handleError(res);
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((res) => {
    return handleError(res);
  })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })

};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return handleError(res);
    })
};