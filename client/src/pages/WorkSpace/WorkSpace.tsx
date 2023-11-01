import { useDispatch } from "react-redux";
import { setLogout } from "../../features/authSlice";

const WorkSpace = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <div>
      <h1>work space</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default WorkSpace;
