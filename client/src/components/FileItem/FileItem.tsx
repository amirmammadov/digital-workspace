import { useSelector, useDispatch } from "react-redux";
import "../../sass/components/_fileItem.scss";

import { API } from "../../constants";

import axios from "axios";
import { StateProps } from "../../interfaces";
import { setDeleteDocument } from "../../features/authSlice";

import { findFileName, commonFileSize, defineImgForFile } from "../../helpers";

interface IProps {
  _id: number;
  filePath: string;
  fileName: string;
  fileSize: string;
  username: string;
}

const FileItem = ({ _id, fileName, fileSize, username }: IProps) => {
  const token = useSelector((state: StateProps) => state.token);
  const openedFolderId = useSelector(
    (state: StateProps) => state.openedFolderId
  );

  const dispatch = useDispatch();

  const handleFileClick = async (fileName: string) => {
    try {
      const response = await axios.get(`${API}download/${fileName}`, {
        responseType: "blob",
      });
      //IF YOU WANNA DOWNLOAD IT
      // FileSaver.saveAs(response.data, fileName);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const objectURL = URL.createObjectURL(blob);
      window.open(objectURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFile = async () => {
    try {
      const response = await axios.delete(
        `${API}api/v1/file/${openedFolderId}/file/${_id}`,
        {
          headers: { Authorization: "Bearer " + token },
          data: { fileName },
        }
      );

      dispatch(setDeleteDocument(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fileItem">
      <img
        src={`/assets/${defineImgForFile(fileName)}`}
        alt="file"
        className="fileItem__img"
      />
      <div className="fileItem__name" onClick={() => handleFileClick(fileName)}>
        {findFileName(fileName)}
      </div>
      <div className="fileItem__info">
        <div className="fileItem__info__size">{commonFileSize(fileSize)}Mb</div>
        <div className="fileItem__info__modified">{username}</div>
      </div>
      <button className="fileItem__deleteBtn" onClick={handleDeleteFile}>
        <img
          src="/assets/delete.png"
          alt="delete"
          className="fileItem__deleteBtn__img"
        />
      </button>
    </div>
  );
};

export default FileItem;
