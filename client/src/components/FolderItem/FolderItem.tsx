import { useState, useEffect } from "react";

import "../../sass/components/_folderItem.scss";

import { API } from "../../constants";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { StateProps, FolderProps } from "../../interfaces";
import {
  setFolders,
  setActiveFolder,
  setDeleteFolder,
} from "../../features/authSlice";

const FolderItems = () => {
  const [binders, setBinders] = useState<FolderProps[]>([]);

  const folders = useSelector((state: StateProps) => state.folders);
  const userID = useSelector((state: StateProps) => state.userID);
  const token = useSelector((state: StateProps) => state.token);

  const dispatch = useDispatch();

  const fetchFolders = async () => {
    try {
      const response = await axios.get(`${API}api/v1/folder/${userID}/folder`, {
        headers: { Authorization: "Bearer " + token },
      });

      dispatch(setFolders(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBinders(folders);
  }, [folders]);

  const handleActiveFolder = (id: number) => {
    dispatch(setActiveFolder({ openedFolderId: id }));
  };

  const handleDeleteFolder = async (id: number) => {
    try {
      const response = await axios.delete(
        `${API}api/v1/folder/${userID}/folder/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      dispatch(setDeleteFolder(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  if (folders.length === 0) {
    return <p className="folderItem__no">No folder yet.</p>;
  }

  return binders.map((binder) => (
    <div className="aside__folder__container">
      <button
        key={binder._id}
        className="aside__folder__container__item"
        onClick={() => handleActiveFolder(binder._id)}
      >
        <img
          src="/assets/folder.png"
          alt="folder"
          className="aside__folder__container__item__img"
        />
        <p className="aside__folder__container__item__text">{binder.title}</p>
      </button>
      <button
        className="aside__folder__container__deleteBtn"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteFolder(binder._id);
        }}
      >
        <img
          src="/assets/delete.png"
          alt="delete"
          className="aside__folder__container__deleteBtn__img"
        />
      </button>
    </div>
  ));
};

export default FolderItems;
