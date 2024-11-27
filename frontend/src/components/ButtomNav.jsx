import { faBell, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const ButtomNav = () => {
  const pathName = useLocation().pathname;
  return (
    <div className="buttom-nav">
      <Link to={"/home"} className={pathName === "/home" ? "active" : ""}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <Link to={"/profile"} className={pathName === "/profile" ? "active" : ""}>
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <Link
        to={"/notification"}
        className={pathName === "/notification" ? "active" : ""}
      >
        <FontAwesomeIcon icon={faBell} />
      </Link>
    </div>
  );
};

export default ButtomNav;
