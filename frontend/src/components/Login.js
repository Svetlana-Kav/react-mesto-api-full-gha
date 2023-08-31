import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/auth.js";
import { useForm } from "../hooks/useForm";

function Login({ handleLogin, setUserEmail }) {
  const { values, handleChange, setValues } = useForm({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(values.password, values.email)
      .then((data) => {
        if (data.token) {
          setUserEmail(values.email)
          setValues({ email: "", password: "" });
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header linkButton={{ name: "Регистрация", link: "/sign-up" }} />
      <div className="form">
        <div className="form__container">
          <p className="form__title">Вход</p>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              className="form__input"
              placeholder="Email"
              name="email"
              required=""
              type="email"
              value={values.email || ''}
            />
            <input
              type="password"
              className="form__input"
              placeholder="Пароль"
              name="password"
              required=""
              value={values.password || ''}
              onChange={handleChange}
            />
            <button className="form__button">Войти</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
