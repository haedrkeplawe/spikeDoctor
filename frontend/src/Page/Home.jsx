import ButtomNav from "../components/ButtomNav";
import TopNav from "../components/TopNav";
import Teeth from "../image/teeth.jpg";
import Tools from "../image/tools.jpg";
import Userwomen from "../image/userwomen.jpg";
import Search from "../components/Search";
import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { Link } from "react-router-dom";
import registerImg from "../image/rigeter.jpg";

const Home = () => {
  const { Lang } = useContext(MainContext);
  return (
    <div className="home-page">
      <TopNav type={Lang !== "ar" ? "Home" : "الرئيسية"} />
      <Search />
      <div className="container">
        <div className="types">
          <span className="background"></span>
          <Link to={"/registers"}>
            <img src={registerImg} alt="" />
            <h5>{Lang !== "ar" ? "Registers" : "سجلاتي"}</h5>
          </Link>
          <Link to={"/appointment"}>
            <img src={Teeth} alt="" />
            <h5>{Lang !== "ar" ? "Appointement" : "مواعيدي"}</h5>
          </Link>
          <Link to={"/material"}>
            <img src={Tools} alt="" />
            <h5> {Lang !== "ar" ? "Material" : "مواد"}</h5>
          </Link>
          <Link to={"/employees"}>
            <img src={Userwomen} alt="" />
            <h5>{Lang !== "ar" ? "Employees" : "موظفيين"}</h5>
          </Link>
        </div>
      </div>
      <ButtomNav />
    </div>
  );
};

export default Home;
