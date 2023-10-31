import SignForm from "../../components/SignForm/SignForm";

import "../../sass/pages/_signUp.scss";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const handleRegister = (username: string, password: string) => {
    axios
      .post("http://localhost:3000/api/v1/users/register", {
        username,
        password,
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <div className="signup__page">
      <h1 className="signup__page--title">Register Page</h1>
      <SignForm onSubmit={handleRegister} />
    </div>
  );
};

export default SignUp;
