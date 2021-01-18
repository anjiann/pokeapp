import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { Pokemon, PokemonType } from "../models/Pokemon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Like from "./common/like";

import {
  addFav,
  deletePokeFromFavorite,
  getfavList,
} from "../services/pokemonServices";
import { Favorites } from "../models/User";

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

const useStyles = makeStyles((theme) => ({
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
  faIcon: {
    color: "white",
  },
  margin: {
    margin: theme.spacing(1),
  },
  icon: {
    alignItems: "left",
  },
  ...types,
}));

interface IPokemonDisplayProps {
  pokemon: Pokemon;
  favorite?: Favorites;
  isfavorite?: Boolean;
  trigger?: any;
}

export const PokemonDisplay: React.FunctionComponent<IPokemonDisplayProps> = (
  props
) => {
  var user = JSON.parse(localStorage.getItem("userKey")!);
  const userid = user ? user.userId : null;

  const [liked, setLiked] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [createNewTeam, setCreateNewTeam] = React.useState<boolean>(false);
  const [favoritesList, changeFavoritesList] = useState<Favorites[]>([]);
  const classes = useStyles();

  const dummyTeamsData = [
    { name: "team 1" },
    { name: "team 2" },
    { name: "team 3" },
  ];

  useEffect(() => {
    if (props.isfavorite) {
      setLiked(!liked);
    }

    let getFavList = async () => {
      changeFavoritesList(await getfavList(userid));
    };
    getFavList();
  }, []);

  const handlePlusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setCreateNewTeam(false);
  };

  const handlePlusClose = () => {
    setAnchorEl(null);
  };

  const handleLikeClick = () => {
    if (!user) {
      //TODO redirect to login
      return;
    }
    setLiked(!liked);

    console.log(liked);
    if (!liked) {
      let getFavList = async () => {
        await addFav(userid, props.pokemon.id);
      };
      getFavList();
    } else if (liked) {
      console.log("i am deleting");

      let deletFav = async () => {
        deletePokeFromFavorite(userid, props.pokemon.id);
      };
      deletFav();
    }
  };

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
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handlePlusClick}
              style={{ padding: 0 }}
            >
              <FontAwesomeIcon
                icon="plus"
                className={classes.faIcon}
                style={{
                  margin: "0 5",
                  cursor: "pointer",
                  outline: "none",
                }}
              />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handlePlusClose}
            >
              {dummyTeamsData.map((team) => (
                <MenuItem disableRipple key={team.name}>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  {team.name}
                </MenuItem>
              ))}
              <Divider />
              {createNewTeam ? (
                <section>
                  <MenuItem disableRipple>
                    <TextField
                      required
                      id="standard-required"
                      label="Name"
                      placeholder="Enter team name..."
                      style={{ marginLeft: 16, marginRight: 16 }}
                    />
                  </MenuItem>
                  <MenuItem disableRipple>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={"ml-auto"}
                    >
                      Create
                    </Button>
                  </MenuItem>
                </section>
              ) : (
                <MenuItem onClick={() => setCreateNewTeam(true)}>
                  <FontAwesomeIcon icon="plus" style={{ width: 42 }} />
                  new team
                </MenuItem>
              )}
            </Menu>
            <div onClick={props.trigger}>
              <Like liked={liked} onClick={handleLikeClick} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
