import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import WorkSpace from "./pages/WorkSpace/WorkSpace";
import NotFound from "./pages/NotFound/NotFound";

import { StateProps } from "./interfaces";

const App = () => {
  const isAuth = useSelector((state: StateProps) => state.token);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <WorkSpace /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuth ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!isAuth ? <SignUp /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
