import Nav from "../../components/Nav/Nav";
import Aside from "../../components/Aside/Aside";
import Space from "../../components/Space/Space";

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
