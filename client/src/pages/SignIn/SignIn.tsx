import SignForm from "../../components/SignForm/SignForm";

import "../../sass/pages/_sign.scss";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../features/authSlice";
import { useState, useEffect } from "react";

const SignIn = () => {
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (serverError !== "") {
      setTimeout(() => {
        return setServerError("");
      }, 2000);
    }
  }, [serverError]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { username, password }
      );

      dispatch(setLogin(response.data));
      navigate("/", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setServerError(error.response.data.message);
    }
  };

  return (
    <div className="sign__page">
      <div className="sign__page__card">
        <h1 className="sign__page__card--title">Login Page</h1>
        <SignForm onSubmit={handleLogin} />
        <Link
          to="/register"
          replace={true}
          className="sign__page__card__switch"
        >
          Don't you have an account? <span>Sign Up</span>
        </Link>
      </div>
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </div>
  );
};

export default SignIn;
