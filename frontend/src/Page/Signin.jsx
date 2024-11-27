import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";

const Auth = () => {
  const { Lang } = useContext(MainContext);
  return (
    <div className="auth">
      <div className="welcome">
        {Lang !== "ar" ? (
          <h2>
            welcome To My Clinic ! <br />
            Sign in
          </h2>
        ) : (
          <h2>
            ! مرحبا بك في عيادتي <br />
            سجل دخول
          </h2>
        )}
      </div>
      <div className="form">
        <span className="background"></span>
        <form>
          <input
            type="text"
            placeholder={
              Lang !== "ar" ? "Enter your full name" : "ادخل اسمك بالكامل"
            }
          />
          <input
            type="text"
            placeholder={Lang !== "ar" ? "Enter your Number" : "ادخل رقمك"}
          />
          <div>
            <input
              type="password"
              placeholder={Lang !== "ar" ? "Enter Password" : "ادخل كلمه السر"}
            />
            <FontAwesomeIcon icon={faEye} />
          </div>
          <Link to="#">
            {" "}
            {Lang !== "ar" ? "Forget Password" : "نسيت كلمه السر"}
          </Link>
        </form>
        <button>{Lang !== "ar" ? "Sign in" : "تسجيل دخول"}</button>
      </div>
    </div>
  );
};

export default Auth;
