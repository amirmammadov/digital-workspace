import "../../sass/layout/_aside.scss";

import FolderItem from "../../components/FolderItem/FolderItem";

const Aside = () => {
  return (
    <aside className="aside">
      <button className="aside__addBtn">Add Folder</button>
      <div className="aside__folderContainer">
        <FolderItem />
      </div>
    </aside>
  );
};

export default Aside;
