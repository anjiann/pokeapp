import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import { Pokemon } from "../models/Pokemon";
import { PokemonDisplay } from "./pokemonDisplay";
import Pagination from "./common/pagination";

interface IPokemonsGrid {
  pokemons: Pokemon[];
}
export const PokemonsGrid: React.FunctionComponent<IPokemonsGrid> = ({
  pokemons,
}) => {
  const [pageSize, setPageSize] = useState<number>(9);
  const [currPage, setCurrPage] = useState<number>(1);

  let pokemonDisplays = pokemons.map((pokemon) => {
    return (
      <Grid key={pokemon.id} xs={4} item>
        <PokemonDisplay pokemon={pokemon} />
      </Grid>
    );
  });

  return (
    <>
      <Grid container spacing={2}>
        {pokemonDisplays}
      </Grid>
      <Pagination
        itemsCount={pokemons.length}
        pageSize={pageSize}
        currentPage={currPage}
        onPageChange={setCurrPage}
      />
    </>
  );
};

export default PokemonsGrid;
