import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import TopNav from "../components/TopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ButtomNav from "../components/ButtomNav";
import axios from "axios";

const Appointment = () => {
  const { Lang, token, userInfo } = useContext(MainContext);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [id, setId] = useState(0);
  const [isNote, setisNote] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [userAll, setUserAll] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [infoOfUserSelected, setInfoOfUserSelected] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [jop, setJop] = useState("");
  const [payment, setPayment] = useState("");
  const [ready, setReady] = useState(false);
  const [img, setImg] = useState("");

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
        setAppointments(response.data.appointment);
        setReady(true);
      });
    axios
      .post(
        "/doctor/allUser",
        { id: userInfo.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUserAll(response.data.user);
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

  function handleacceptAppointment(id) {
    setReady(false);
    axios
      .post(
        "/doctor/acceptAppointment",
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

  function handleCreate() {
    setReady(false);
    axios
      .post(
        "/doctor/createAppointment",
        {
          name: infoOfUserSelected[1],
          age: infoOfUserSelected[2],
          time: time,
          date: date,
          user_id: infoOfUserSelected[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        showAllThink();
        setOpen(false);
        setInfoOfUserSelected([]);
        setDate("");
        setTime("");
      });
  }

  function handleUpdate() {
    setReady(false);
    axios
      .post(
        "/doctor/updateAppointment",
        {
          id: id,
          the_jop: jop,
          payments: payment,
          photo: img[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        showAllThink();
        setOpenUpdate(false);
        setJop("");
        setPayment("");
      });
  }

  return (
    <div className="registers-page">
      <TopNav type={Lang !== "ar" ? "Appointment" : "المواعيد"} />
      <div className="head">
        <button
          className={isNote ? "acitve" : ""}
          onClick={() => setisNote(true)}
        >
          {Lang !== "ar" ? "new" : "جديدة"}
        </button>
        <button
          className={!isNote ? "acitve" : ""}
          onClick={() => setisNote(false)}
        >
          {Lang !== "ar" ? "accepted" : "مقبولة"}
        </button>
      </div>
      <div className="container">
        {!ready && <div className="loader-animation"></div>}
        {ready && (
          <div className="boxs">
            {(isNote &&
              appointments.map((appointment) => {
                if (appointment.state === "1") {
                  return (
                    <div className="box" key={appointment.id}>
                      <div>
                        <h4>{Lang !== "ar" ? "Name : " : " : الاسم"} </h4>
                        <p>{appointment.name}</p>
                      </div>
                      <div>
                        <h4>{Lang !== "ar" ? "Date : " : " : الموعد"} </h4>
                        <p>{appointment.date}</p>
                      </div>
                      <div className="doctor">
                        <button
                          className="main"
                          onClick={() =>
                            handleacceptAppointment(appointment.id)
                          }
                        >
                          {Lang !== "ar" ? "Accept" : "تاكبد"}
                        </button>
                        <button
                          className="main"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          {Lang !== "ar" ? "Deelete" : "حذف"}
                        </button>
                      </div>
                    </div>
                  );
                }
              })) ||
              appointments.map((appointment) => {
                if (appointment.state === "0") {
                  return (
                    <div className="box" key={appointment.id}>
                      <div>
                        <h4>{Lang !== "ar" ? "Name : " : " : الاسم"} </h4>
                        <p>{appointment.name}</p>
                      </div>
                      <div>
                        <h4>{Lang !== "ar" ? "Date : " : " : الموعد"} </h4>
                        <p>{appointment.date}</p>
                      </div>
                      <div className="doctor">
                        <button
                          className="main"
                          onClick={() => {
                            setOpenUpdate(!openUpdate);
                            setId(appointment.id);
                          }}
                        >
                          {Lang !== "ar" ? "Done" : "اتمام الموعد"}
                        </button>
                        <button
                          className="main"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          {Lang !== "ar" ? "Deelete" : "حذف"}
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        )}

        {(open && (
          <div className="popp">
            <div className="create">
              <FontAwesomeIcon icon={faXmark} onClick={() => setOpen(!open)} />
              {showSearch && (
                <div className="search-component search-user">
                  <form>
                    <div>
                      <input
                        type="text"
                        placeholder={
                          Lang !== "ar" ? "Select user" : "اخنر مستخدم"
                        }
                        value={search}
                        onChange={(ev) => setSearch(ev.target.value)}
                      />
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <div className="userlist">
                      {userAll &&
                        userAll.map((user) => {
                          return (
                            <div
                              className="user"
                              key={user.id}
                              onClick={() => {
                                setId(user.id),
                                  setShowSearch(false),
                                  setInfoOfUserSelected([
                                    user.id,
                                    user.name,
                                    user.age,
                                  ]);
                              }}
                            >
                              <h2>{user.name}</h2>
                              <p>{user.phone}</p>
                            </div>
                          );
                        })}
                    </div>
                  </form>
                </div>
              )}
              <div>
                <h5>
                  {Lang !== "ar" ? "User Selected: " : ":المستخدم امختار"}
                  <input
                    placeholder="user"
                    value={infoOfUserSelected[1]}
                    onChange={(ev) => {}}
                    onClick={() => setShowSearch(true)}
                  />
                </h5>
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Enter date: " : ":ادخل التاريخ"}</h5>
                <input
                  type="date"
                  value={date}
                  onChange={(ev) => setDate(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Enter time: " : ":ادخل الوقت"}</h5>
                <input
                  type="time"
                  value={time}
                  onChange={(ev) => setTime(ev.target.value)}
                />
              </div>
              <button onClick={() => handleCreate(id)}>
                {Lang !== "ar" ? "Create" : "اضافه"}
              </button>
            </div>
          </div>
        )) || <FontAwesomeIcon icon={faPlus} onClick={() => setOpen(!open)} />}

        {openUpdate && (
          <div className="popp">
            <div className="create update">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setOpenUpdate(!openUpdate)}
              />
              <div className="image">
                {img === "" && <h3>chose image</h3>}
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImg(e.target.files)}
                  placeholder="select image"
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Jop: " : " :العمل"}</h5>
                <input
                  type="text"
                  value={jop}
                  onChange={(ev) => setJop(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Total payment: " : " :اجمالي الدفع"}</h5>
                <input
                  type="number"
                  value={payment}
                  onChange={(ev) => setPayment(ev.target.value)}
                />
              </div>
              <button onClick={() => handleUpdate()}>
                {Lang !== "ar" ? "Save" : "حفظ"}
              </button>
            </div>
          </div>
        )}
      </div>
      <ButtomNav />
    </div>
  );
};

export default Appointment;
