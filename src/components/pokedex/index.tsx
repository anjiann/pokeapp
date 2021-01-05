import React from "react";
import SearchBar from "./searchbar";
import PokemonsGrid from "./pokemonsGrid";

export const Pokedex: React.FunctionComponent<any> = (props) => {
  return (
    <div>
      <SearchBar />
      <PokemonsGrid />
    </div>
  );
};
