import React from "react";
import SearchBar from "./searchbar";
import PokemonsGrid from "./pokemonsGrid";
import ListGroup from "./common/listGroup";
import SideBar from "./sideBar";

const Pokedex: React.FunctionComponent<any> = (props) => {
  return (
    <div>
      <SearchBar />
      <SideBar />
      <ListGroup />
      <PokemonsGrid />
    </div>
  );
};

export default Pokedex;
