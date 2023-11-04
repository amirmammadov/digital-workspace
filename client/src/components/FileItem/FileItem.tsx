import "../../sass/components/_fileItem.scss";

interface IProps {
  filePath: string;
  fileName: string;
  fileSize: string;
  username: string;
}

const FileItem = ({ filePath, fileName, fileSize, username }: IProps) => {
  const handleFileClick = (filePath: string) => {
    window.open(filePath, "_blank");
  };

  return (
    <div className="fileItem">
      <img src="/assets/file.png" alt="file" className="fileItem__img" />
      <div className="fileItem__name" onClick={() => handleFileClick(filePath)}>
        {fileName}
      </div>
      <div className="fileItem__info">
        <div className="fileItem__info__size">{fileSize}</div>
        <div className="fileItem__info__modified">{username}</div>
      </div>
    </div>
  );
};

export default FileItem;
