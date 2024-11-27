import { Routes, Route, Link } from "react-router-dom";
import Login from "./Page/Login";
import Signin from "./Page/Signin";
import Profile from "./Page/Profile";
import Home from "./Page/Home";
import Notification from "./Page/Notification";
import AboutClinc from "./Page/AboutClinc";
import Registers from "./Page/Registers";
import Messages from "./Page/Messages";
import Appointment from "./Page/Appointment";
import { useContext } from "react";
import { MainContext } from "./context/MainContext";
import axios from "axios";
import Matierial from "./Page/Matierial";
import Employees from "./Page/Employees";
import MainURL from "./MainURL";

axios.defaults.baseURL = MainURL;

function App() {
  const { Lang } = useContext(MainContext);

  return (
    <div className={Lang !== "ar" ? "App" : "App ar"}>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/about" element={<AboutClinc />} />
        <Route path="/registers" element={<Registers />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/material" element={<Matierial />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;
