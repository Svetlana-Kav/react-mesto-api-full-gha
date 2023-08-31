import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from "./Register";
import Login from "./Login";
import imageInfoTooltipOk from "../images/status-ok.svg";
import imageInfoTooltipError from "../images/status-error.svg";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";
// import { handleSubmit } from "../utils/utils"; 

//У МЕНЯ СЕЙЧАС ОТОБРАЖАЕТСЯ ТОЛЬКО ОДИН ХЕДЕР, EMAIL ПРИ ПЕРВОЙ ОТРИСОВКЕ ЕСТЬ,ВОЙТИ БЕЗ АВТОРИЗАЦИИ НЕ МОГУ

function App() {
  //переменные попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpenOk, setIsInfoTooltipOpenOk] = React.useState(false);
  const [isInfoTooltipOpenError, setIsInfoTooltipOpenError] =
    React.useState(false);

  const [infoCardForDelete, setinfoCardForDelete] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(false);

  // React.useEffect(() => {
  //   handleTokenCheck();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  //загрузка карточек и данных о пользователе при первоначальной отрисовке
  React.useEffect(() => {
    api
      .getUserInfo(localStorage.jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.log(error));

    api
      .getCards(localStorage.jwt)
      .then((cards) => {
        const allCards = cards.reverse()
        setCards(allCards);
      })
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      });
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, isActive: false });
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpenOk(false);
    setIsInfoTooltipOpenError(false);
  }

  function handleCardClick({ name, link, isActive }) {
    setSelectedCard({ name, link, isActive });
  }

  //добавление и удаление ЛАЙКОВ
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      });
  };



  //handleSubmit оставляем в App? если нет, то почитать как импортировать 


  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setLoading(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      // в каждом запросе нужно ловить ошибку
      // console.error обычно используется для логирования ошибок, если никакой другой обработки ошибки нет
      .catch(console.error)
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => setLoading(false));
  }

  //удаление КАРТОЧЕК
  function handleCardDelete() {
    function makeRequest() {
      return api.deleteCard(infoCardForDelete._id, localStorage.jwt).then((cards) => {
        setCards((state) =>
          state.filter((c) => c._id !== infoCardForDelete._id)
        );
      });
    }
    handleSubmit(makeRequest);
  }

  //САБМИТ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  function handleUpdateUser({ name, about }) {
    function makeRequest() {
      return api.editUserInfo({ name, about }, localStorage.jwt).then((data) => {
        setCurrentUser(data);
      });
    }
    handleSubmit(makeRequest);
  }

  //САБМИТ РЕДАКТИРОВАНИЯ АВАТАРА
  function handleSubmitAvatar({ avatar }) {
    function makeRequest() {
      return api.editUserAvatar({ avatar }, localStorage.jwt).then((data) => {
        setCurrentUser(data);
      });
    }
    handleSubmit(makeRequest);
  }

  //САБМИТ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
  function handleAddPlaceSubmit(data) {
    function makeRequest() {
      return api.addCard(data, localStorage.jwt).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest);
  }


  const handleLogin = () => {
    setLoggedIn(true);
  };

  //проверка токена при первой отрисовке
  React.useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
        })
        .then((res) => {
          setLoggedIn(true);
        })
        .then((res) => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(`${err.status} ${err.text}`);
        });
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {loggedIn && (
          <Header
            linkButton={{ name: "Выйти", link: "/sign-in" }}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            email={userEmail}
          />
        )}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                setIsInfoTooltipOpenOk={setIsInfoTooltipOpenOk}
                setIsInfoTooltipOpenError={setIsInfoTooltipOpenError}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login setUserEmail={setUserEmail} handleLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                setinfoCardForDelete={setinfoCardForDelete}
                openDeleteCardPopup={setIsDeleteCardPopupOpen}
                cards={cards}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpenOk}
          onClose={closeAllPopups}
          image={imageInfoTooltipOk}
          title="Вы успешно зарегистрировались"
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpenError}
          onClose={closeAllPopups}
          image={imageInfoTooltipError}
          title="Что-то пошло не так! Попробуйте ещё раз."
        />

        {/* попап изменения аватара */}
        <EditAvatarPopup
          loading={loading}
          onUpdateAvatar={handleSubmitAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        {/* попап редактирования профиля */}

        <EditProfilePopup
          loading={loading}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        {/* попап добавления карточки */}

        <AddPlacePopup
          loading={loading}
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        {/*попап удаления карточки*/}

        <DeleteCardPopup
          loading={loading}
          handleCardDelete={handleCardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          name="delete-card"
          title="Вы уверены?"
          nameButton="Да"
        />

        {/* попап увеличения картинки */}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
