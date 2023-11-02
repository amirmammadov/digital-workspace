import { useState, useEffect } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { StateProps, FolderProps } from "../../interfaces";

import "../../sass/layout/_space.scss";

// import FileItem from "../../components/FileItem/FileItem";

const Space = () => {
  const [binder, setBinder] = useState<FolderProps>({
    _id: -1,
    userID: -1,
    title: "",
    createdAt: -1,
    updatedAt: -1,
  });

  const userID = useSelector((state: StateProps) => state.userID);
  const token = useSelector((state: StateProps) => state.token);
  const openedFolderId = useSelector(
    (state: StateProps) => state.openedFolderId
  );

  const fetchFolder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/folder/${userID}/folder/${openedFolderId}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setBinder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (openedFolderId !== -1) {
      fetchFolder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFolderId]);

  return (
    <div className="space">
      <div className="space__header">
        <div className="space__header__text">{binder.title}</div>
        <button className="space__header__btn">Add File</button>
      </div>
      <div className="space__content">
        <div className="space__content__filter">
          <img
            src="/assets/filter.png"
            alt="filter"
            className="space__content__filter__img"
          />
          <div className="space__content__filter__sections">
            <button className="space__content__filter__sections__size">
              Size
            </button>
            <button className="space__content__filter__sections__author">
              Author
            </button>
          </div>
        </div>
        <div className="space__content__files">{/* <FileItem /> */}</div>
      </div>
    </div>
  );
};

export default Space;
