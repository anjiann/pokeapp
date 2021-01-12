import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Pokemon, PokemonType } from "../models/Pokemon";

const types = {
  flying: {
    backgroundColor: "#A890F0",
  },
  fire: {
    backgroundColor: "#F08030",
  },
  normal: {
    backgroundColor: "#A8A878",
  },
  fighting: {
    backgroundColor: "#C03028",
  },
  water: {
    backgroundColor: "#6890F0",
  },
  grass: {
    backgroundColor: "#78C850",
  },
  poison: {
    backgroundColor: "#A040A0",
  },
  electric: {
    backgroundColor: "#F8D030",
  },
  ground: {
    backgroundColor: "#E0C068",
  },
  psychic: {
    backgroundColor: "#F85888",
  },
  rock: {
    backgroundColor: "#B8A038",
  },
  ice: {
    backgroundColor: "#98D8D8",
  },
  bug: {
    backgroundColor: "#A8B820",
  },
  dragon: {
    backgroundColor: "#7038F8",
  },
  ghost: {
    backgroundColor: "#705898",
  },
  dark: {
    backgroundColor: "#705848",
  },
  steel: {
    backgroundColor: "#B8B8D0",
  },
  fairy: {
    backgroundColor: "#EE99AC",
  },
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
  },
  picture: {
    height: 150,
  },
  ...types,
});

interface IPokemonDisplayProps {
  pokemon: Pokemon;
}

export const PokemonDisplay: React.FunctionComponent<IPokemonDisplayProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <Card className={classes.root + " " + classes.steel}>
      <CardMedia
        className={classes.picture + " " + classes.ice}
        image={props.pokemon.picture}
        title={`Picture of ${props.pokemon.name}`}
      />
      <CardContent>
        <Typography variant="h5" component="h3">
          {props.pokemon.name}
        </Typography>
        <Typography variant="body2" component="p">
          ID: {props.pokemon.id} Weight: {props.pokemon.weight}
        </Typography>
        <Chip
          className={classes[props.pokemon.type[0]]}
          label={props.pokemon.type[0]}
        />
        {/* conditional rendering */}
        {props.pokemon.type[1] && (
          <Chip
            className={classes[props.pokemon.type[1]]}
            label={props.pokemon.type[1]}
          />
        )}
      </CardContent>
    </Card>
  );
};
