import TopNav from "../components/TopNav";
import Search from "../components/Search";
import ButtomNav from "../components/ButtomNav";
import userwomen from "../image/userwomen.jpg";
import { faChevronRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MainContext } from "../context/MainContext";

const Notification = () => {
  const { Lang, userInfo, token } = useContext(MainContext);
  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    axios
      .post(
        "/doctor/showMessages",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReady(true);
        setMessages(response.data.messages);
      });
  }, []);

  return (
    <div className="notification-page">
      <TopNav type={"Notification"} />
      <Search />
      <div className="boxs">
        {!ready && <div className="loader-animation"></div>}
        {ready &&
          messages &&
          messages.map((message) => {
            const text = message.the_sender;
            const words = text.split(" ");
            const firstWord = words[0];
            if (firstWord === "Doctor") {
              return (
                <div className="box" key={message.id}>
                  <div className="left">
                    <img src={userwomen} alt="" />
                  </div>
                  <div className="right">
                    <h2>{message.title}</h2>
                    <p>{message.body}</p>
                    <div>
                      <div>
                        <h2>{message.the_sender}</h2>
                        <span>{message.time}</span>
                      </div>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <ButtomNav />
    </div>
  );
};

export default Notification;
