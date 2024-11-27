import ButtomNav from "../components/ButtomNav";
import TopNav from "../components/TopNav";
import {
  faClock,
  faHeart,
  faLocationDot,
  faPlus,
  faStar,
  faThumbsUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";

const AboutClinc = () => {
  const { Lang, token, userInfo } = useContext(MainContext);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [jop, setJop] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [time, setTime] = useState("");
  const [sallary, setSallary] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="about-page">
      <TopNav />
      <div className="head">
        <h2>{Lang !== "ar" ? "ABOUT CLINIC !" : "! حول العيادة"}</h2>
      </div>
      <div className="container">
        <div className="background"></div>
        <div className="box">
          <div className="info">
            <div className="img"></div>
            <div className="right">
              <div className="top">
                <FontAwesomeIcon icon={faStar} />
                <div>
                  <h4>7 {Lang !== "ar" ? "Years" : "سنوات"}</h4>
                  <p> {Lang !== "ar" ? "Experience" : "خبرة"}</p>
                </div>
              </div>
              <div className="buttom">
                <p>
                  <span>{Lang !== "ar" ? "focus" : "انتبه"}:</span>{" "}
                  {Lang !== "ar"
                    ? "Lorem ipsum dolor sit amet consectetur adipisicing elit Exercitationem deserunt natus cupiditate Blanditiis fugiat asper impedit?"
                    : "هنا يمكنك اضافه امر عن عيادتك مكان ساعات الخ "}
                </p>
              </div>
            </div>
          </div>
          <div className="name">
            <h2>Dr.Fady Foad Housain</h2>
          </div>
          <div className="time">
            <div>
              <FontAwesomeIcon icon={faClock} />
              <p>Sat-Th/12:00AM-7:00PM</p>
            </div>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        </div>
        <div className="social">
          <div>
            <FontAwesomeIcon icon={faHeart} />
            <span></span>
          </div>
          <div>
            <FontAwesomeIcon icon={faStar} />
            <span></span>
          </div>
          <div>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span></span>
          </div>
        </div>
        <div className="location">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>
            {Lang !== "ar"
              ? "Hamadania - Tshtin Project / Build 237"
              : "حمدانيه - مشروع تشتن / بناء 237"}
          </p>
        </div>
        {(open && (
          <div className="popp doctor">
            <div className="create full">
              <FontAwesomeIcon icon={faXmark} onClick={() => setOpen(!open)} />
              <div>
                <h5>
                  {Lang !== "ar" ? "Years of exprerience : " : ": سنوات الخبره"}
                </h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div>
                <h5>
                  {Lang !== "ar"
                    ? "About your clinic : "
                    : ": معلومات عن عيادتك"}
                </h5>
                <input
                  className="about"
                  type="text"
                  name=""
                  id=""
                  value={jop}
                  onChange={(ev) => setJop(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Working time :" : ": اوقات العمل"}</h5>
                <input
                  type="text"
                  name=""
                  id=""
                  value={gender}
                  onChange={(ev) => setGender(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Whats App: " : ": رقم الواتساب"}</h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={number}
                  onChange={(ev) => setNumber(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "FaceBook: " : ": فيسبوك"}</h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>

              <div>
                <h5>{Lang !== "ar" ? "Instagram: " : ": انستقرام"}</h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={age}
                  onChange={(ev) => setAge(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Location: " : ": موقع العياده"}</h5>
                <input
                  type="text"
                  name=""
                  id=""
                  value={time}
                  onChange={(ev) => setTime(ev.target.value)}
                />
              </div>
              <button>{Lang !== "ar" ? "Update" : "تحديث"}</button>
            </div>
          </div>
        )) || (
          <FontAwesomeIcon
            icon={faPlus}
            className="sweam"
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      <ButtomNav />
    </div>
  );
};

export default AboutClinc;
