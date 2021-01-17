import { Grid, IconButton } from "@material-ui/core";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Pokemon, PokemonType } from "../models/Pokemon";
import { getCurrentUser } from "../services/authService";
import { deletePokeFromFavorite, getOnePokemon } from "../services/pokemonServices";
import { PokemonDisplay } from "./pokemonDisplay";
import {Favorites, User} from "../models/User";
import { pokeApi } from "../services/httpService";
import DeleteIcon from '@material-ui/icons/Delete';

const FavoritesList: React.FunctionComponent<any>=()=>{
const [currentPokemons, changeCurrentPokemons] = useState<Pokemon[]>([]);
const[favotiteList, changeFavoriteList]=useState<Favorites[]>([])

const deletePoke=async (e:SyntheticEvent, id:number)=>{
  e.preventDefault()
  try{
  
 deletePokeFromFavorite(id)
 console.log("I am here")
  }
  catch(error){
   
   console.log(error)
  }
}

var user=JSON.parse(localStorage.getItem('userKey')!);
const myArr=user.favlist;
console.log(myArr);

const pok: Pokemon[]=[];
console.log(myArr.length)
useEffect(()=>{
const getPokemon=async()=>{
for(let i=0;i<myArr.length;i++){
  let pokemons=await getOnePokemon(myArr[i].favPokeId)
pok.push(pokemons)
}
  changeCurrentPokemons([
    ...pok,
    
  ])
}
changeFavoriteList([
  ...myArr,
])
getPokemon()
},[])

  let displayPokemon = currentPokemons.map((fpokemon)=>{
for(let i=0;i<favotiteList.length;i++){
  if(fpokemon.id===favotiteList[i].favPokeId){
      return (
          <Grid xs={4}  item>
              <PokemonDisplay pokemon={fpokemon} favorite={favotiteList[i]}/>
              <IconButton >
         <DeleteIcon />
         </IconButton>
          </Grid>
      )
  }}})

return(
    <Grid container spacing={3}>
        {displayPokemon}
       
    </Grid>
)
}
export default FavoritesList;