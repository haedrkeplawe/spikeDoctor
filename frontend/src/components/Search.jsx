import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";

const Search = () => {
  const { Lang } = useContext(MainContext);
  const [search, setSearch] = useState("");

  return (
    <div className="search-component">
      <form>
        <div>
          <input
            type="text"
            placeholder={Lang !== "ar" ? "Search" : "بحث"}
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </form>
    </div>
  );
};

export default Search;
