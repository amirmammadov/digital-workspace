import { useState, useEffect } from "react";

import SignForm from "../../components/SignForm/SignForm";

import { useNavigate, Link } from "react-router-dom";

import "../../sass/pages/_sign.scss";

import axios from "axios";

const SignUp = () => {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (serverError !== "") {
      setTimeout(() => {
        return setServerError("");
      }, 2000);
    }
    if (setSuccess) {
      setTimeout(() => {
        return setSuccess(false);
      }, 2000);
    }
  }, [serverError]);

  const navigate = useNavigate();

  const handleRegister = async (username: string, password: string) => {
    try {
      await axios.post("http://localhost:3000/api/v1/users/register", {
        username,
        password,
      });
      setSuccess(true);
      setTimeout(() => {
        return navigate("/login", { replace: true });
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setServerError(error.response.data.message);
    }
  };

  return (
    <div className="sign__page">
      <div className="sign__page__card">
        <h1 className="sign__page__card--title">Register Page</h1>
        <SignForm onSubmit={handleRegister} />
        <Link to="/login" replace={true} className="sign__page__card__switch">
          Already have an account? <span>Sign In</span>
        </Link>
      </div>
      {success && (
        <div className="pop-up pop-up__success">
          <h2 className="pop-up__text__success">Successfully Signed Up!</h2>
        </div>
      )}
      {serverError !== "" && (
        <div className="pop-up pop-up__error">
          <h2 className="pop-up__text__error">{serverError}</h2>
        </div>
      )}
    </div>
  );
};

export default SignUp;
