import { useState, useEffect } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { StateProps, FolderProps } from "../../interfaces";

import "../../sass/layout/_space.scss";

import FileItem from "../../components/FileItem/FileItem";

const Space = () => {
  const [binder, setBinder] = useState<FolderProps>({
    _id: -1,
    userID: -1,
    title: "",
    createdAt: -1,
    updatedAt: -1,
  });
  const [fileData, setFileData] = useState<File | null>(null);

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFileData(selectedFile);
    }
  };

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
    if (openedFolderId !== -1 && userID !== -1) {
      fetchFolder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFolderId, userID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fileData) {
      const data = new FormData();
      data.append("file", fileData);

      try {
        await axios.post(
          `http://localhost:3000/api/v1/file/${openedFolderId}/file`,
          data,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFileData(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="space">
      <div className="space__header">
        <div className="space__header__text">{binder.title}</div>
        <form onSubmit={handleSubmit} className="space__header__form">
          <label htmlFor="file">
            {fileData ? fileData.name : "Choose File"}
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="space__header__form__input"
            onChange={fileChangeHandler}
          />
          <button type="submit" className="space__header__form__btn">
            Upload
          </button>
        </form>
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
        <div className="space__content__files">
          <FileItem />
        </div>
      </div>
    </div>
  );
};

export default Space;
