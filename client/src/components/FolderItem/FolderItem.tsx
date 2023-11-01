import "../../sass/components/_folderItem.scss";

const FolderItem = () => {
  return (
    <div className="aside__folderContainer__item">
      <img
        src="/assets/folder.png"
        alt="folder"
        className="aside__folderContainer__item__img"
      />
      <p className="aside__folderContainer__item__text">New Folder</p>
    </div>
  );
};

export default FolderItem;
