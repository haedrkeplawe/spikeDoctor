import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { Lang, userInfo } = useContext(MainContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [redirect, setRedirect] = useState(false);

  async function handleLogin() {
    axios
      .post("/doctor/login", {
        phone: phone,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("userInfo", JSON.stringify(response.data.doctor));
        setRedirect(true);
      })
      .catch((error) => {
        setIsError(error.response.data.error);
      });
  }

  if (redirect) {
    return <Navigate to={"/home"} />;
  }
  return (
    <div className="auth">
      <div className="welcome">
        {Lang !== "ar" ? (
          <h2>
            welcome To My Clinic ! <br />
            Log in
          </h2>
        ) : (
          <h2>
            ! مرحبا بك في عيادتي <br />
            انشاء حساب
          </h2>
        )}
      </div>
      <div className="form">
        <span className="background"></span>
        <form>
          <input
            type="text"
            placeholder={Lang !== "ar" ? "Enter your Number" : "ادخل رقمك"}
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
          <div>
            <input
              type={showPassword ? "password" : "text"}
              placeholder={Lang !== "ar" ? "Enter Password" : "ادخل كلمه السر"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {(!showPassword && <FontAwesomeIcon icon={faEye} />) || (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div>
          <span className={isError ? "error" : ""}>{isError}</span>
        </form>
        <button onClick={() => handleLogin()}>
          {Lang !== "ar" ? "Log in" : "انشاء حساب"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
