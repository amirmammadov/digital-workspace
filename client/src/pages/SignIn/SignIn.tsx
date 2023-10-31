import SignForm from "../../components/SignForm/SignForm";

import "../../sass/pages/_signIn.scss";

import axios, { AxiosResponse } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../features/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    axios
      .post("http://localhost:3000/api/v1/users/login", {
        username,
        password,
      })
      .then(
        (
          res: AxiosResponse<{ token: string; user: string; userID: number }>
        ) => {
          dispatch(setLogin(res.data));
          navigate("/", { replace: true });
        }
      )
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <div className="login__page">
      <h1 className="login__page--title">Login Page</h1>
      <SignForm onSubmit={handleLogin} />
      <Link to="/register" replace={true} className="login__page__switch">
        Don't you have an account?
      </Link>
    </div>
  );
};

export default SignIn;
