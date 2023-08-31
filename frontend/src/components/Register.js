import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/auth.js";
import { useForm } from "../hooks/useForm";

function Register({setIsInfoTooltipOpenOk,setIsInfoTooltipOpenError}) {

  const {values, handleChange, setValues} = useForm({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(values.password, values.email)
      .then((res) => {
        setValues({
          email: "",
          password: "",
        });
        setIsInfoTooltipOpenOk(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipOpenError(true);
        navigate("/sign-up");
      });
  };

  return (
    <>
      <Header linkButton={{ name: "Войти", link: "/sign-in" }} />
      <div className="form">
        <div className="form__container">
          <p className="form__title">Регистрация</p>
          <form onSubmit={handleSubmit} autoComplete="on">
            <input
              onChange={handleChange}
              className="form__input"
              placeholder="Email"
              name="email"
              value={values.email || ''}
              required=""
              type="email"
            />
            <input
              onChange={handleChange}
              type="password"
              className="form__input"
              placeholder="Пароль"
              name="password"
              value={values.password || ''}
              required=""
              minLength={2}
              maxLength={40}
            />
            <button className="form__button">Зарегистрироваться</button>
          </form>
          <NavLink to="/sign-in" className="form__link">
            Уже зарегистрированы? Войти
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Register;
