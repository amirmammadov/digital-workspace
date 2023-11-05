import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setFolders } from "../../features/authSlice";

import { API } from "../../constants";

import { StateProps } from "../../interfaces";

import "../../sass/layout/_aside.scss";

import FolderItem from "../../components/FolderItem/FolderItem";

const Aside = () => {
  const [title, setTitle] = useState<string>("");

  const dispatch = useDispatch();

  const userID = useSelector((state: StateProps) => state.userID);
  const token = useSelector((state: StateProps) => state.token);

  const handleAddFolder = async () => {
    try {
      const response = await axios.post(
        `${API}api/v1/folder/${userID}/folder`,
        { userID, title },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      dispatch(setFolders(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
    }
  };

  return (
    <aside className="aside">
      <div className="aside__addFolder">
        <input
          type="text"
          className="aside__addFolder__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Folder name..."
        />
        <button className="aside__addFolder__btn" onClick={handleAddFolder}>
          Add Folder
        </button>
      </div>
      <div className="aside__folderContainer">
        <FolderItem />
      </div>
    </aside>
  );
};

export default Aside;
