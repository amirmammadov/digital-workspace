import Nav from "../../scenes/Nav/Nav";
import Aside from "../../scenes/Aside/Aside";
import Space from "../../scenes/Space/Space";

const WorkSpace = () => {
  return (
    <div className="workSpace">
      <Nav />
      <div className="workSpace__content">
        <Aside />
        <Space />
      </div>
    </div>
  );
};

export default WorkSpace;
