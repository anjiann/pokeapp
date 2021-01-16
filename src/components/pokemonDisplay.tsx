import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Pokemon, PokemonType } from "../models/Pokemon";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

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
    minWidth: 200,
    maxWidth: 300,
  },
  picture: {
    height: 225,
  },
  cardContent: {
    backgroundColor: "#373737",
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
        className={classes.picture}
        style={{ backgroundColor: "black" }}
        image={props.pokemon.picture}
        title={`Picture of ${props.pokemon.name}`}
      />
      <CardContent className={classes.cardContent}>
        <div className="row">
          <Typography
            style={{ color: "white", marginLeft: 15 }}
            variant="h5"
            component="h3"
          >
            {props.pokemon.name}
          </Typography>
        </div>
        <div className="row">
          <Chip
            className={classes[props.pokemon.type[0]]}
            style={{ marginLeft: 15, marginRight: 5 }}
            label={props.pokemon.type[0]}
          />
          {props.pokemon.type[1] && (
            <Chip
              className={classes[props.pokemon.type[1]]}
              label={props.pokemon.type[1]}
            />
          )}
          <div
            className="ml-auto"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <FontAwesomeIcon
              icon="plus"
              style={{
                margin: "0 5",
              }}
            />
            <FavoriteTwoToneIcon
              style={{
                margin: "0 5",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
