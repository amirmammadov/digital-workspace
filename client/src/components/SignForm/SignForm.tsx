import { FormEvent, useState } from "react";

import "../../sass/components/_signForm.scss";

import { FormProps } from "../../interfaces/index";

const SignForm = ({ onSubmit }: FormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="form">
      <form className="form__container" onSubmit={handleSubmit}>
        <div className="form__container__item">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form__container__item__input"
            placeholder="Enter username..."
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form__container__item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form__container__item__input"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form__container__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignForm;
