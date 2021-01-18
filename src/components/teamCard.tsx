import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TeamList, Teams } from "../models/User";
import { addPokeToTeam, deletePokeFromTeam, deleteTeam, getOnePokemon, getTeamById } from "../services/pokemonServices";
import { Avatar, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { Pokemon } from "../models/Pokemon";
import { Add } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import { getUserById } from "../services/userService";
import { PokemonContext } from "../App";
import RemoveIcon from '@material-ui/icons/Remove';
const useStyles = makeStyles({
  root: {
    marginTop:25,
    minWidth: 275,
  },
  title: {
    color:"white",
    fontSize: 24,
  },
  custom:{
    color:"white",
  },
});
const TeamCard: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const[currentTeamList,changeCurrentTeamList]=useState<TeamList[]>([]);
const [refresh,setRefresh]=useState(false);
  
  const pokeValue=useContext(PokemonContext);

  useEffect(()=>{
    const getTeamList=async()=>{
     changeCurrentTeamList(await getTeamById(props.id))
    }
  getTeamList()
  setRefresh(false)
  },[refresh])

  const deleteTeamDisplay=async(id:number)=>{
    try{ 
    await deleteTeam(id)
    }catch(e){
      console.log(e)
    }
    
  }

  const deletePokeFromTeamList=async(id:number)=>{
    try{
      await deletePokeFromTeam(id)
      console.log("Delete succeed")
    }catch(e){
      console.log(e)
    }
  }
  let changeState=()=>{
    setRefresh(true)
  }
    let displayTeamList = pokeValue.map((pokemon:Pokemon)=>{
      for(let i=0;i<currentTeamList.length;i++){
        if(pokemon.id===currentTeamList[i].teamPokeId){
      return (
        <div key={pokemon.id}>

          <Grid xs={4}  item>
      <List>
        <div className="row">
        <ListItem className={classes.custom} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={pokemon.name} src={pokemon.picture}/>
          </ListItemAvatar>
          <ListItemText>
          {pokemon.name}
          </ListItemText>
          <ListItemSecondaryAction onClick={()=>{setRefresh(true)}}>
          <IconButton className="ml-auto" edge="end" style={{color: "white"}} onClick={()=>{deletePokeFromTeamList(currentTeamList[i].id)}}>
            <RemoveIcon/>
          </IconButton>
          </ListItemSecondaryAction>
          </ListItem>
        </div>

        
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
        Pokemon Team<span> </span>
        {props.name}
        </Typography>
        <div>
        {displayTeamList}
        </div>
      </CardContent>
      <CardActions onClick={props.triger} style={{backgroundColor: "grey"}}>
      <IconButton onClick={()=>deleteTeamDisplay(props.id)} >
        <DeleteIcon></DeleteIcon>
      </IconButton>
      </CardActions>
    </Card>
   
    </>
  );
};
export default TeamCard;
