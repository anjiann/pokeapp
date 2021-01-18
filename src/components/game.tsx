import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  TextareaAutosize,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Pokemon, PokemonType } from "../models/Pokemon";
import { getOnePokemon } from "../services/pokemonServices";
import { PokemonDisplay } from "./pokemonDisplay";

export const Game: React.FunctionComponent<any> = () => {
  const [pokedex, setPokeDex] = useState<Pokemon[]>([]);
  const [rendomPokemon, setRendomPokemon] = useState<Pokemon>({
    name: "bulbasaur",
    id: 1,
    weight: 20,
    picture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    type: [PokemonType.Grass, PokemonType.Poison],
  });
  const [sendRequest, setSendRequest] = useState(true);

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(500);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  console.log(pokeId());

  useEffect(() => {
    console.log("i am calling ");

    if (sendRequest) {
      let getPoke = async () => {
        setRendomPokemon(await getOnePokemon(pokeId()));
      };
      getPoke();
    }

    setSendRequest(false);
  }, [sendRequest]);

  console.log(rendomPokemon);

  const removePokemaon = (id: number) => {
    setPokeDex((prevState) => prevState.filter((p) => p.id != id));
  };

  let storePoke = (pokemon: Pokemon) => {
    setPokeDex((prevState) => {
      const pokeExist =
        prevState.filter((poke) => pokemon.id == poke.id).length > 0;
      if (!pokeExist) {
        return [...prevState, pokemon];
      } else {
        return prevState;
      }
    });

    setSendRequest(true);
  };

  let pokeDexDisplay = pokedex.map((pokemon) => {
    return (
      <>
        <Grid item xs={3} alignContent="flex-start" key={pokemon.id}>
          <PokemonDisplay pokemon={pokemon} />
        </Grid>
      </>
    );
  });

  let RendomDisplayPokemon = () => {
    return (
      <>
       <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
            <Grid item xs={12}>
          <PokemonDisplay pokemon={rendomPokemon}></PokemonDisplay>
          </Grid>
          <Grid item xs={12} >
              
            <Button
              variant="outlined"
              color="primary"
              onClick={() => storePoke(rendomPokemon)}
            >
              Catch
            </Button>
          
          
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setSendRequest(true)}
            >
              Skip
            </Button>
            </Grid>
            </Grid>
      </>
    );
  };
  //<div style={{ float: "right" }}>
//<div style={{ float: "left" }}>
  //<div style={{ margin: " 1% 0% 1% 36%" }}> 
  //<div style={{ padding: "auto", margin: "0% 45% 1% 36%" }}>
  return (
    <>
      
        <RendomDisplayPokemon></RendomDisplayPokemon>
      
      
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          {pokeDexDisplay}
        </Grid>
      
    </>
  );
};
