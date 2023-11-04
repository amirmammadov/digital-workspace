import "../../sass/components/_fileItem.scss";

import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateProps, FileProps } from "../../interfaces";

const FileItem = () => {
  const [files, setFiles] = useState<FileProps[]>();

  const token = useSelector((state: StateProps) => state.token);
  const openedFolderId = useSelector(
    (state: StateProps) => state.openedFolderId
  );

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/file/${openedFolderId}/file`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileClick = (filePath: string) => {
    window.open(filePath, "_blank");
  };

  if (files?.length === 0) {
    return <p className="no__file">There is no file yet!</p>;
  }

  return files?.map((file) => {
    return (
      <div className="fileItem">
        <img src="/assets/file.png" alt="file" className="fileItem__img" />
        <div
          className="fileItem__name"
          onClick={() => handleFileClick(file.filePath)}
        >
          {file.fileName}
        </div>
        <div className="fileItem__info">
          <div className="fileItem__info__size">{file.fileSize}</div>
          <div className="fileItem__info__modified">{file.username}</div>
        </div>
      </div>
    );
  });
};

export default FileItem;
