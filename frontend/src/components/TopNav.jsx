import {
  faArrowLeft,
  faEllipsisVertical,
  faGlobe,
  faInfo,
  faPlus,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import { useContext, useState } from "react";
import axios from "axios";

const TopNav = ({ type }) => {
  const { Lang, setLang, userInfo, token } = useContext(MainContext);
  const [isOpen, setIsOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  function handleLogout() {
    axios
      .post(
        "/doctor/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", null);
        localStorage.setItem("userInfo", null);
        setRedirect(true);
      });
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="top-nav">
      <div className={isOpen ? "background isOpen" : "background close"}></div>
      <div>
        <Link to={"/home"}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <h2>{type}</h2>
      <div>
        <Link to={"/messages"}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
      <div className={isOpen ? "dots isOpen" : "dots close"}>
        <div className="close">
          <FontAwesomeIcon
            icon={faX}
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
        <div className="info">
          <div className="img"></div>
          <h2>{userInfo && userInfo.name}</h2>
        </div>
        <div className="lest">
          <Link to={"/about"}>
            <p>{Lang !== "ar" ? "about Clinec" : "حول العيادة"}</p>
            <FontAwesomeIcon icon={faInfo} />
          </Link>
          <div onClick={() => setLang(Lang !== "ar" ? "ar" : "en")}>
            <p>{Lang !== "ar" ? "Lang" : "اللغة"}</p>
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div onClick={() => handleLogout()}>
            <p>{Lang !== "ar" ? "Logout" : "تسجيل الخروج"}</p>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
