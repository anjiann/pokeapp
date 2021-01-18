import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TeamList, Teams } from "../models/User";
import { addPokeToTeam, deleteTeam, getOnePokemon, getTeamById } from "../services/pokemonServices";
import { Avatar, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Pokemon } from "../models/Pokemon";
import { Add } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import { getUserById } from "../services/userService";
import { PokemonContext } from "../App";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    color:"white",
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  custom:{
    color:"white",
  },
});
const TeamCard: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();

  const[currentTeamList,changeCurrentTeamList]=useState<TeamList[]>([]);
 // const [currentPokemon, setPokemon]=useState<Pokemon[]>([]);
  
  const pokeValue=useContext(PokemonContext);

  useEffect(()=>{
    const getTeamList=async()=>{
     changeCurrentTeamList(await getTeamById(props.id))
    }
  getTeamList()
  },[])
  const deleteTeamDisplay=async(id:number)=>{
    
    try{ 
    await deleteTeam(id)
    console.log("Success")
    }catch(e){
      console.log(e)
    }
    
  }
    let displayTeamList = pokeValue.map((pokemon:Pokemon)=>{
      for(let i=0;i<currentTeamList.length;i++){
        if(pokemon.id===currentTeamList[i].teamPokeId){
      return (
        <div key={pokemon.id}>

          <Grid xs={4}  item>
      <List>
        <ListItem className={classes.custom} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={pokemon.name} src={pokemon.picture}/>
          </ListItemAvatar>
          <ListItemText>
          {pokemon.name}
          </ListItemText>
          </ListItem>
        
      </List>
          </Grid>
          </div>
      )
        }
      }
    })



  return (
    <>
    <Card className={classes.root} variant="outlined">
      <CardContent style={{backgroundColor: "black"}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Team
        </Typography>
        <Typography style={{color: "white"}}>
        {props.name}
        </Typography>
        {displayTeamList}
      </CardContent>
      <CardActions onClick={props.triger} style={{backgroundColor: "black"}}>
      <IconButton onClick={()=>deleteTeamDisplay(props.id)} >
        <DeleteIcon style={{backgroundColor: "white"}}></DeleteIcon>
      </IconButton>
      </CardActions>
    </Card>
    </>
  );
};
export default TeamCard;
