import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import WorkSpace from "./pages/WorkSpace/WorkSpace";

import { StateProps } from "./interfaces";

const App = () => {
  const isAuth = useSelector((state: StateProps) => state.token);
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/workspace"
        element={isAuth ? <WorkSpace /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
