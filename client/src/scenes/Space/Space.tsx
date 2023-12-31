import { useState, useEffect } from "react";

import { API } from "../../constants";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { StateProps, FolderProps } from "../../interfaces";

import { setDocuments } from "../../features/authSlice";

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

  const dispatch = useDispatch();

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
  const documents = useSelector((state: StateProps) => state.documents);

  const fetchFolder = async () => {
    try {
      const response = await axios.get(
        `${API}api/v1/folder/${userID}/folder/${openedFolderId}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setBinder(response.data);
      fetchFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `${API}api/v1/file/${openedFolderId}/file`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      dispatch(setDocuments(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (openedFolderId !== -1 && userID !== -1) {
      fetchFolder();
    }

    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFolderId, userID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (fileData) {
      const data = new FormData();
      data.append("file", fileData);

      try {
        const response = await axios.post(
          `${API}api/v1/file/${openedFolderId}/file`,
          data,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFileData(null);
        dispatch(setDocuments(response.data));

        fetchFiles();
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
          {documents.length === 0 && (
            <div className="no__file">No file yet!</div>
          )}

          {documents?.map((file) => {
            if (file.folderID === openedFolderId) {
              return <FileItem key={file._id} {...file} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Space;
