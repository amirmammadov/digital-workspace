import "../../sass/components/_fileItem.scss";

const FileItem = () => {
  return (
    <div className="fileItem">
      <img src="/assets/file.png" alt="file" className="fileItem__img" />
      <div className="fileItem__name">JavaScript docs</div>
      <div className="fileItem__info">
        <div className="fileItem__info__size">140 KB</div>
        <div className="fileItem__info__modified">Mammadov</div>
      </div>
    </div>
  );
};

export default FileItem;
