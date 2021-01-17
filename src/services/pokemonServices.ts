import { Pokemon } from "../models/Pokemon";
import { TeamList, Teams } from "../models/User";
import { dbApi, pokeApi } from "./httpService";

const apiEndpoint = "/pokemon";

function pokemonUrl(id: Number) {
  return `${apiEndpoint}/${id}`;
}

export function getPokemons() {
  return pokeApi.get(apiEndpoint);
}

export function getPokemon(id: Number) {
  return pokeApi.get(pokemonUrl(id));
}

export const getOnePokemon = async (pokeId:number):Promise<Pokemon> =>{
  try{
      let res = await pokeApi.get(`/pokemon/${pokeId}`)

      let pokemon = new Pokemon()
      pokemon.id = res.data.id
      pokemon.name = res.data.name
      pokemon.picture = res.data.sprites.front_default
      pokemon.weight = res.data.weight
      pokemon.type = [ res.data.types[0].type.name, res.data.types[1] && res.data.types[1].type.name]
      return pokemon
  }catch(e){
      throw new Error()
  }
}

export const getTeamById=async(teamId:number):Promise<any>=>{
  try{
   let res=await dbApi.get(`/team/${teamId}`)
  
  return res.data;
 
  }catch(e){
    throw new Error();
  }
}

export function deletePokeFromFavorite(pokeId:number){
  
 dbApi.get(`/favorite/deletfav/${pokeId}`)
console.log("deleted")
}

