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
  const { Lang, userInfo, token } = useContext(MainContext);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pieces, setPieces] = useState("");
  const [company, setCompany] = useState("");
  const [matiereals, setMatiereals] = useState([]);
  const [ready, setReady] = useState(false);

  function showAllThink() {
    setReady(false);
    axios
      .post(
        "/doctor/material/show",
        { id: userInfo.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMatiereals(response.data.materials);
        setReady(true);
      });
  }

  useEffect(() => {
    showAllThink();
  }, []);

  function handleUpdate(id, name, price, pieces, company) {
    setOpen(!open);
    setIsCreate(false);
    setName(name);
    setPrice(price);
    setPieces(pieces);
    setCompany(company);
    setId(id);
  }
  function handleCreate() {
    setName("");
    setPrice("");
    setPieces("");
    setCompany("");
    setIsCreate(true);
    setOpen(!open);
  }
  function handleDelete(id) {
    setReady(false);
    axios
      .post(
        "/doctor/material/destroymaterial",
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
  function handleCreateMatiral() {
    setReady(false);
    axios
      .post(
        "/doctor/material/addmaterials",
        {
          name: name,
          price: price,
          pices: pieces,
          company: company,
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
  function handleUpdateMatiral() {
    setReady(false);
    axios
      .post(
        "/doctor/material/updatematerial",
        {
          name: name,
          price: price,
          pices: pieces,
          company: company,
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
      <TopNav type={Lang !== "ar" ? "Material" : "المواد"} />
      <div className="container">
        <div className="boxs">
          {!ready && <div className="loader-animation"></div>}
          {ready &&
            matiereals &&
            matiereals.map((matiereal) => {
              return (
                <div className="box" key={matiereal.id}>
                  <div>
                    <h4> {Lang !== "ar" ? "Name :  " : "   : الاسم"} </h4>
                    <p> {matiereal.name}</p>
                  </div>
                  <div>
                    <h4> {Lang !== "ar" ? "Price :  " : "   : السعر"} </h4>
                    <p> {matiereal.price}</p>
                  </div>
                  <div>
                    <h4> {Lang !== "ar" ? "Pieces :  " : "   : القطع"} </h4>
                    <p> {matiereal.pices}</p>
                  </div>
                  <div>
                    <h4> {Lang !== "ar" ? "Company :  " : "   : الشركة"} </h4>
                    <p> {matiereal.company}</p>
                  </div>
                  <span className="doctor">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(matiereal.id)}
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() =>
                        handleUpdate(
                          matiereal.id,
                          matiereal.name,
                          matiereal.price,
                          matiereal.pices,
                          matiereal.company
                        )
                      }
                    />
                  </span>
                </div>
              );
            })}
        </div>
        {(open && (
          <>
            <div className="popp doctor">
              <div className="create">
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => setOpen(!open)}
                />
                <div>
                  <h5>{Lang !== "ar" ? "name:  " : " : اسم المادة"}</h5>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                  />
                </div>
                <div>
                  <h5>{Lang !== "ar" ? "price:  " : " : سعر المادة"}</h5>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={price}
                    onChange={(ev) => setPrice(ev.target.value)}
                  />
                </div>
                <div>
                  <h5>{Lang !== "ar" ? "Pieces :" : " : القطع"}</h5>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={pieces}
                    onChange={(ev) => setPieces(ev.target.value)}
                  />
                </div>
                <div>
                  <h5>{Lang !== "ar" ? "Company: " : " : الشركه"}</h5>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={company}
                    onChange={(ev) => setCompany(ev.target.value)}
                  />
                </div>
                {(isCreate && (
                  <button onClick={() => handleCreateMatiral()}>
                    {Lang !== "ar" ? "Create" : "اضافه"}
                  </button>
                )) || (
                  <button
                    onClick={() =>
                      handleUpdateMatiral((name, price, pieces, company))
                    }
                  >
                    {Lang !== "ar" ? "Update" : "تحديث"}
                  </button>
                )}
              </div>
            </div>
          </>
        )) || <FontAwesomeIcon icon={faPlus} onClick={() => handleCreate()} />}
      </div>

      <ButtomNav />
    </div>
  );
};

export default Matierial;
