import {
  faEye,
  faEyeSlash,
  faPencil,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ButtomNav from "../components/ButtomNav";
import TopNav from "../components/TopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userWhite from "../image/userWhite.jpg";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import MainURLImage from "../MainURLImage";

const Profile = () => {
  const { Lang, token, userInfo } = useContext(MainContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isError, setIsError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [img, setImg] = useState("");

  function handleUpdateUser(ev) {
    ev.preventDefault();
    axios
      .post(
        "doctor/updateprofile",
        {
          id: userInfo.id,
          name: name,
          password: newPassword,
          profile_picture: img[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        userInfo.name = name;
        userInfo.profile_picture = response.data.doctor.profile_picture;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setShowEditProfile(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="user-page">
      <TopNav type={null} />
      <div className="my-profile">
        <h3> {Lang !== "ar" ? "My Profile" : "ملفي الشخصي"}</h3>
        <div className="img">
          <img src={MainURLImage + userInfo.profile_picture} />
        </div>
      </div>
      <div className="form">
        <span className="background"></span>
        {(!showEditProfile && (
          <div className="showProfile">
            <div className="photo"></div>
            <div>
              <input type="text" value={userInfo.name} />
              <FontAwesomeIcon icon={faUser} className="password" />
            </div>
            <button onClick={() => setShowEditProfile(!showEditProfile)}>
              {Lang !== "ar" ? "Update" : "تعديل"}
            </button>
          </div>
        )) || (
          <form onSubmit={(ev) => handleUpdateUser(ev)}>
            <div className="image">
              {img === "" && (
                <h4>{Lang !== "ar" ? "chose image : " : " : اختر صورة"}</h4>
              )}
              <input
                type="file"
                id="image"
                onChange={(e) => setImg(e.target.files)}
                placeholder="select image"
              />
            </div>
            <input
              type="text"
              placeholder={
                Lang !== "ar" ? "Enter New Name" : "ادخل الاسم الجديد"
              }
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <div>
              <input
                type={showPassword ? "password" : "text"}
                placeholder={
                  Lang !== "ar"
                    ? "Enter Old Password"
                    : "ادخل كلمه السر القديمة"
                }
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {(!showPassword && (
                  <FontAwesomeIcon icon={faEye} className="password" />
                )) || (
                  <FontAwesomeIcon icon={faEyeSlash} className="password" />
                )}
              </div>
            </div>
            <div>
              <input
                type={showPassword ? "password" : "text"}
                placeholder={
                  Lang !== "ar"
                    ? "Enter New Password"
                    : "ادخل كلمه السر الجديده"
                }
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {(!showPassword && (
                  <FontAwesomeIcon icon={faEye} className="password" />
                )) || (
                  <FontAwesomeIcon icon={faEyeSlash} className="password" />
                )}
              </div>
            </div>
            <div className="buttons">
              <button type="submit"> {Lang !== "ar" ? "Save" : "حفظ"}</button>
              <button
                type="button"
                onClick={() => setShowEditProfile(!showEditProfile)}
              >
                {Lang !== "ar" ? "Cancle" : "الغاء"}
              </button>
            </div>
          </form>
        )}
      </div>
      <ButtomNav />
    </div>
  );
};

export default Profile;
