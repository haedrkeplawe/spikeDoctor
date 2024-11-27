import { createContext, useEffect, useState } from "react";

export const MainContext = createContext({});

export function MainContextProvider({ children }) {
  const [Lang, setLang] = useState("en");
  let localuser = "";
  let localtoken = "";
  if (
    localStorage.getItem("token") !== "" &&
    localStorage.getItem("userInfo") !== ""
  ) {
    localuser = useState(JSON.parse(localStorage.getItem("userInfo")));
    localtoken = useState(JSON.parse(localStorage.getItem("token")));
  } else {
    localuser = "";
    localtoken = "";
  }

  const [userInfo, setUserInfo] = useState(localuser[0]);
  const [token, setToken] = useState(localtoken[0]);

  return (
    <MainContext.Provider
      value={{ Lang, setLang, userInfo, setUserInfo, token, setToken }}
    >
      {children}
    </MainContext.Provider>
  );
}
