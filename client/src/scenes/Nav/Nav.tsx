import "../../sass/layout/_nav.scss";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../../features/authSlice";

import { StateProps } from "../../interfaces";
import { Link } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();

  const username = useSelector((state: StateProps) => state.user);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav__title">
        Your CyberSphere
      </Link>
      <div className="nav__message">Welcome, {username}</div>
      <button onClick={handleLogout} className="nav__btn">
        <img src="/assets/exit.png" alt="exit" className="nav__btn__img" />
      </button>
    </nav>
  );
};

export default Nav;
