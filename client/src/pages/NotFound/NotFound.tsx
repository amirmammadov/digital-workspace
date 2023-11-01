import { Link } from "react-router-dom";
import "../../sass/pages/_notFound.scss";

const NotFound = () => {
  return (
    <div className="notfound__page">
      <div className="notfound__page__card">
        <div className="notfound__page__card--title">
          404: Journey to the Unknown
        </div>
        <Link to="/" replace={true} className="notfound__page__card__switch">
          Backward
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
