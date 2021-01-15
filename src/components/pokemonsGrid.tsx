import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";

import { Pokemon, PokemonType } from "../models/Pokemon";
import { PokemonDisplay } from "./pokemonDisplay";
import { getPokemons } from "../services/pokeServices/pokemonService";
import Pagination from "./common/pagination";

export const PokemonsGrid: React.FunctionComponent<any> = (props) => {
  let dummyPokemons: Pokemon[] = [];
  for (let i = 1; i <= 9; i++) {
    let currPokemon: Pokemon = {
      name: "bulbasaur",
      id: i,
      weight: 20,
      picture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      type: [PokemonType.Grass, PokemonType.Poison],
    };
    dummyPokemons.push(currPokemon);
  }

  const [currPokemons, setCurrPokemons] = useState<Pokemon[]>(dummyPokemons);

  const [pageSize, setPageSize] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getPokemon = async () => {
      let pokemons = await getPokemons((currentPage - 1) * pageSize, pageSize);
      setCurrPokemons(pokemons);
    };
    getPokemon();
  }, [currentPage, pageSize]);

  let pokemonDisplays = currPokemons.map((pokemon) => {
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
        itemsCount={currPokemons.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default PokemonsGrid;
