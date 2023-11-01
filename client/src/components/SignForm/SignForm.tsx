import { FormEvent, useState } from "react";

import "../../sass/components/_signForm.scss";

import { FormProps } from "../../interfaces/index";

const SignForm = ({ onSubmit }: FormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
    setUsername("");
    setPassword("");
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible((prevValue) => {
      return !prevValue;
    });
  };

  const passwordVisibilityImg = passwordVisible ? "view.png" : "hide.png";

  return (
    <div className="form">
      <form className="form__container" onSubmit={handleSubmit}>
        <div className="form__container__item">
          <input
            type="text"
            id="username"
            className="form__container__item__input"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form__container__item">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="form__container__item__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="form__container__item__switchBtn"
            onClick={handlePasswordVisibility}
          >
            <img
              src={`/assets/${passwordVisibilityImg}`}
              alt="hide"
              className="form__container__item__switchBtn__img"
            />
          </button>
        </div>
        <button
          disabled={!username || !password}
          type="submit"
          className={`form__container__btn ${username && password && "active"}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignForm;
