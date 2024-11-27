import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search";
import TopNav from "../components/TopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";
import ButtomNav from "../components/ButtomNav";
import axios from "axios";

const Registers = () => {
  const { Lang, userInfo, token } = useContext(MainContext);
  const [isNote, setisNote] = useState(false);
  const [ready, setReady] = useState(false);
  const [registers, setRegisters] = useState([]);

  function showAllThink() {
    setReady(false);
    axios
      .post(
        "/doctor/showAppointment",
        { id: userInfo.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setRegisters(response.data.appointment);
        setReady(true);
      });
  }

  useEffect(() => {
    showAllThink();
  }, []);

  function handleDelete(id) {
    setReady(false);
    axios
      .post(
        "/doctor/destroyAppointment",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        showAllThink();
      });
  }

  return (
    <div className="registers-page">
      <TopNav type={Lang !== "ar" ? "Registers" : "السجلات"} />
      <Search />
      {/* <div className="head">
        <button
          className={isNote ? "acitve" : ""}
          onClick={() => setisNote(true)}
        >
          {Lang !== "ar" ? "notes" : "ملاحظات"}
        </button>
        <button
          className={!isNote ? "acitve" : ""}
          onClick={() => setisNote(false)}
        >
          {Lang !== "ar" ? "registers" : "سجلات"}
        </button>
      </div> */}
      <div className="container">
        {!ready && <div className="loader-animation"></div>}
        {ready && !isNote && (
          <div className="boxs">
            {registers &&
              registers.map((register) => {
                if (register.state === "2") {
                  return (
                    <div className="box" key={register.id}>
                      <div>
                        <h4>{Lang !== "ar" ? "Name : " : " : الاسم"} </h4>
                        <p>{register.name}</p>
                      </div>
                      <div>
                        <h4>{Lang !== "ar" ? "jop : " : " : العمل"} </h4>
                        <p>{register.the_jop}</p>
                      </div>
                      <div>
                        <h4>
                          {Lang !== "ar" ? "Payment : " : " : اجمالي الدفع"}
                        </h4>
                        <p>{register.payments}</p>
                      </div>
                      <div>
                        <h4>{Lang !== "ar" ? "Date : " : " : تاريخ"} </h4>
                        <p>{register.date}</p>
                      </div>
                      <span>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => handleDelete(register.id)}
                        />
                      </span>
                    </div>
                  );
                }
              })}
          </div>
        )}
        {/* {isNote && (
          <div className="boxs">
            <div className="box">
              <div>
                <h4> {Lang !== "ar" ? "notes" : "ملاحظات"}: </h4>
                <p> {Lang !== "ar" ? "any thing" : "اي شي"}</p>
              </div>
              <span>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
            <div className="box">
              <div>
                <h4> {Lang !== "ar" ? "notes" : "ملاحظات"}: </h4>
                <p> {Lang !== "ar" ? "any thing" : "اي شي"}</p>
              </div>
              <span>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
            <div className="box">
              <div>
                <h4> {Lang !== "ar" ? "notes" : "ملاحظات"}: </h4>
                <p> {Lang !== "ar" ? "any thing" : "اي شي"}</p>
              </div>
              <span>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
            <div className="box">
              <div>
                <h4> {Lang !== "ar" ? "notes" : "ملاحظات"}: </h4>
                <p> {Lang !== "ar" ? "any thing" : "اي شي"}</p>
              </div>
              <span>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
            <div className="box">
              <div>
                <h4> {Lang !== "ar" ? "notes" : "ملاحظات"}: </h4>
                <p> {Lang !== "ar" ? "any thing" : "اي شي"}</p>
              </div>
              <span>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          </div>
        )} */}
      </div>
      <ButtomNav />
    </div>
  );
};

export default Registers;
