import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TeamList, Teams } from "../models/User";
import { getOnePokemon, getTeamById } from "../services/pokemonServices";
import { Grid, IconButton, List, ListItem } from "@material-ui/core";
import { Pokemon } from "../models/Pokemon";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const TeamCard:React.FunctionComponent<any>=(props)=> {
  const classes = useStyles();
  const[currentTeamList,changeCurrentTeamList]=useState<TeamList[]>([]);
  const [currentPokemon, setPokemon]=useState<Pokemon[]>([]);
  useEffect(()=>{
    const getTeamList=async()=>{
     changeCurrentTeamList(await getTeamById(props.id))
    }
    getTeamList()
    },[])
    
    let tempArr:Pokemon[]=[]
  useEffect(()=>{
    const getPokemon=async()=>{
    for(let i=0;i<currentTeamList.length;i++){
      let pokemon=await getOnePokemon(currentTeamList[i].teamPokeId)
      console.log("Pokemon",pokemon)
      tempArr.push(pokemon);
    }
    setPokemon([
      ...tempArr,
    ])
  }
  getPokemon()
  },[])
  console.log("Pokemons",currentPokemon)
    let displayTeamList = currentPokemon.map((teamL)=>{
      return (
        <div key={teamL.id}>

          <Grid xs={4}  item>
      <List>
        <ListItem>{teamL.name}</ListItem>
      </List>
          </Grid>
          </div>
      )
    })

  return (
    <>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Team
        </Typography>
        <Typography>
        {props.name}
        </Typography>
        {displayTeamList}
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    
    </>
  );
}
export default TeamCard;