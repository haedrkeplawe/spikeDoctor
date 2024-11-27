import TopNav from "../components/TopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import ButtomNav from "../components/ButtomNav";
import axios from "axios";

const Messages = () => {
  const { Lang, userInfo, token } = useContext(MainContext);
  const [userAll, setUserAll] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [infoOfUserSelected, setInfoOfUserSelected] = useState([]);

  useEffect(() => {
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
  }, []);

  function handleCreateMessage() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    axios
      .post(
        "/doctor/createMessage",
        {
          body: message,
          time: `${hours}:${minutes}`,
          date: `${year}/${month}/${day}`,
          title: `note`,
          user_id: infoOfUserSelected[0],
          doctor_id: userInfo.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="messages-page">
      <TopNav type={Lang !== "ar" ? "Messages" : "الرسائل"} />
      <div className="head"></div>
      <div className="container">
        <div className="search-component search-user">
          <form>
            <div>
              <input
                type="text"
                placeholder={Lang !== "ar" ? "Select user" : "اخنر مستخدم"}
                value={search || infoOfUserSelected[1]}
                onChange={(ev) => setSearch(ev.target.value)}
                onClick={() => setShowSearch(true)}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            {showSearch && (
              <div className="userlist rel">
                {userAll &&
                  userAll.map((user) => {
                    return (
                      <div
                        className="user"
                        key={user.id}
                        onClick={() => {
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
            )}
          </form>
        </div>
        <div className="create">
          <h3>Craete a Message: </h3>
          <span>NOTE</span>
        </div>
        <form>
          <>
            {/* <div className="select">
              <h3>Select Image (optinal): </h3>
              <input type="file" id="img" />
              <label htmlFor="img">
                <img src={example} alt="" />
              </label>
            </div> */}
          </>
          <div>
            <input
              type="text"
              placeholder={Lang !== "ar" ? "Enter messages..." : "ادخل الرسالة"}
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={() => handleCreateMessage()}
            />
          </div>
        </form>
      </div>
      <ButtomNav />
    </div>
  );
};

export default Messages;
