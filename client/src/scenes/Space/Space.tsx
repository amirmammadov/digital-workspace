import "../../sass/layout/_space.scss";

import FileItem from "../../components/FileItem/FileItem";

const Space = () => {
  return (
    <div className="space">
      <div className="space__header">
        <div className="space__header__text">Folder Name</div>
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
        <div className="space__content__files">
          <FileItem />
        </div>
      </div>
    </div>
  );
};

export default Space;
