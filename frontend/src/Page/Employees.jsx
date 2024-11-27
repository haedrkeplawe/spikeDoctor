import {
  faPen,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import TopNav from "../components/TopNav";
import ButtomNav from "../components/ButtomNav";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Matierial = () => {
  const { Lang, token, userInfo } = useContext(MainContext);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [name, setName] = useState("");
  const [jop, setJop] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [time, setTime] = useState("");
  const [sallary, setSallary] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [nurses, setNurses] = useState([]);
  const [ready, setReady] = useState(false);

  function showAllThink() {
    setReady(false);
    axios
      .post(
        "/doctor/nurses",
        { id: userInfo.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setNurses(response.data.nurses);
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
        "/doctor/delete-nurse",
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

  function handleUpdate(
    id,
    name,
    jop,
    gender,
    number,
    age,
    time,
    sallary,
    date
  ) {
    setId(id);
    setOpen(!open);
    setIsCreate(false);
    setName(name);
    setJop(jop);
    setGender(gender);
    setNumber(number);
    setAge(age);
    setTime(time);
    setSallary(sallary);
    setDate(date);
  }
  function handleCreate() {
    setName("");
    setJop("");
    setGender("");
    setNumber("");
    setPassword("");
    setAge("");
    setTime("");
    setSallary("");
    setDate("");
    setIsCreate(true);
    setOpen(!open);
  }
  function handleCreateEmployyes() {
    setReady(false);
    axios
      .post(
        "/doctor/signup-nurse",
        {
          name: name,
          phone: number,
          gender: gender,
          age: age,
          the_jop: jop,
          time: time,
          salary: sallary,
          date: date,
          password: password,
          doctor_id: userInfo.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resopnse) => {
        showAllThink();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleUpdateEmployyes() {
    setReady(false);
    axios
      .post(
        "/doctor/update-nurse",
        {
          name: name,
          phone: number,
          gender: gender,
          age: age,
          the_jop: jop,
          time: time,
          salary: sallary,
          date: date,
          doctor_id: userInfo.id,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resopnse) => {
        showAllThink();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="registers-page">
      <TopNav type={Lang !== "ar" ? "Employees" : "الموظفين"} />
      <div className="container">
        <div className="boxs">
          {!ready && <div className="loader-animation"></div>}
          {ready &&
            nurses &&
            nurses.map((nurse) => {
              return (
                <div className="box doctor" key={nurse.id}>
                  <div>
                    <div className="left">
                      <div>
                        <h4> {Lang !== "ar" ? "Name :" : ": الاسم"} </h4>
                        <p>{nurse.name}</p>
                      </div>
                      <div>
                        <h4> {Lang !== "ar" ? "Jop :" : ": العمل"} </h4>
                        <p> {nurse.the_jop}</p>
                      </div>
                      <div>
                        <h4> {Lang !== "ar" ? "gender :" : ": الجنس"} </h4>
                        <p> {nurse.gender}</p>
                      </div>
                      <div>
                        <h4> {Lang !== "ar" ? "Number :" : ": الرقم"} </h4>
                        <p> {nurse.phone}</p>
                      </div>
                    </div>
                    <div className="right">
                      <div>
                        <h4> {Lang !== "ar" ? "Age :" : ": العمر"} </h4>
                        <p> {nurse.age}</p>
                      </div>
                      <div>
                        <h4> {Lang !== "ar" ? "Time :" : ": الوقت"} </h4>
                        <p> {nurse.time}</p>
                      </div>
                      <div>
                        <h4> {Lang !== "ar" ? "Sallary :" : ": الراتب"} </h4>
                        <p> {nurse.salary}</p>
                      </div>
                      <div>
                        <h4> {Lang !== "ar" ? "Date :" : ": التاريخ"} </h4>
                        <p> {nurse.date}</p>
                      </div>
                    </div>
                  </div>
                  <span className="doctor">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(nurse.id)}
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() =>
                        handleUpdate(
                          nurse.id,
                          nurse.name,
                          nurse.the_jop,
                          nurse.gender,
                          nurse.phone,
                          nurse.age,
                          nurse.time,
                          nurse.salary,
                          nurse.date
                        )
                      }
                    />
                  </span>
                </div>
              );
            })}
        </div>
        {(open && (
          <div className="popp doctor">
            <div className="create full">
              <FontAwesomeIcon icon={faXmark} onClick={() => setOpen(!open)} />
              <div>
                <h5>{Lang !== "ar" ? "Name: " : ": الاسم"}</h5>
                <input
                  type="text"
                  name=""
                  id=""
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Jop: " : ": العمل"}</h5>
                <input
                  type="text"
                  name=""
                  id=""
                  value={jop}
                  onChange={(ev) => setJop(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "gender:" : ": الجنس"}</h5>
                <input
                  type="text"
                  name=""
                  id=""
                  value={gender}
                  onChange={(ev) => setGender(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Number: " : ": الرقم"}</h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={number}
                  onChange={(ev) => setNumber(ev.target.value)}
                />
              </div>
              {isCreate && (
                <div>
                  <h5>{Lang !== "ar" ? "password: " : ": كلمه السر"}</h5>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </div>
              )}

              <div>
                <h5>{Lang !== "ar" ? "Age: " : ": العمر"}</h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={age}
                  onChange={(ev) => setAge(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Time: " : ": الوقت"}</h5>
                <input
                  type="text"
                  name=""
                  id=""
                  value={time}
                  onChange={(ev) => setTime(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Sallary:" : ": الراتب"}</h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={sallary}
                  onChange={(ev) => setSallary(ev.target.value)}
                />
              </div>
              <div>
                <h5>{Lang !== "ar" ? "Date: " : ": التاريخ"}</h5>
                <input
                  type="number"
                  name=""
                  id=""
                  value={date}
                  onChange={(ev) => setDate(ev.target.value)}
                />
              </div>
              {(isCreate && (
                <button onClick={() => handleCreateEmployyes()}>
                  {Lang !== "ar" ? "Create" : "اضافه"}
                </button>
              )) || (
                <button onClick={() => handleUpdateEmployyes()}>
                  {Lang !== "ar" ? "Update" : "تحديث"}
                </button>
              )}
            </div>
          </div>
        )) || <FontAwesomeIcon icon={faPlus} onClick={() => handleCreate()} />}
      </div>

      <ButtomNav />
    </div>
  );
};

export default Matierial;
