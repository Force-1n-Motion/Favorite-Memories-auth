import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthError, setIsAuthError] = useState(false);

  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://auth.nomoreparties.co/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // Сохраняем JWT токен в localStorage
   localStorage.setItem("token", response.data.token);
   localStorage.setItem("email", email)
        history("/");
       
        // Очищаем поля ввода
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Ошибка авторизации:", error);
        // Обработка ошибок авторизации, например, показ сообщения об ошибке
        setIsAuthError(true);
      });
  };


  return (
    <div>
      <Header>
        <Link className="link" to="/sign-up">
          Регистрация
        </Link>
      </Header>
      <h2 className="login__text">Вход</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <hr width="360px" />
        <input
          className="input"
          type="password"
          required
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <hr width="360px" />
        <input className="button__login" type="submit" value="Войти" />
      </form>

      <InfoTooltip
        isOpen={isAuthError}
        onClose={() => setIsAuthError(false)}
        isSuccessful={false}
      />
    </div>
  );
};

export default Login;
