import Nav from "../../scenes/Nav/Nav";
import Aside from "../../scenes/Aside/Aside";
import Space from "../../scenes/Space/Space";
import EmptySpace from "../../scenes/EmptySpace/EmptySpace";

import { useSelector } from "react-redux";

import { StateProps } from "../../interfaces";

const WorkSpace = () => {
  const openedFolderId = useSelector(
    (state: StateProps) => state.openedFolderId
  );

  return (
    <div className="workSpace">
      <Nav />
      <div className="workSpace__content">
        <Aside />
        {openedFolderId !== -1 ? <Space /> : <EmptySpace />}
      </div>
    </div>
  );
};

export default WorkSpace;
