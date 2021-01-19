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

export const getOnePokemon = async (pokeId: number): Promise<Pokemon> => {
  try {
    let res = await pokeApi.get(`/pokemon/${pokeId}`);

    let pokemon = new Pokemon();
    pokemon.id = res.data.id;
    pokemon.name = res.data.name;
    pokemon.picture = res.data.sprites.front_default;
    pokemon.weight = res.data.weight;
    pokemon.type = [
      res.data.types[0].type.name,
      res.data.types[1] && res.data.types[1].type.name,
    ];
    return pokemon;
  } catch (e) {
    throw new Error();
  }
};

export const getTeamById = async (teamId: number): Promise<any> => {
  try {
    let res = await dbApi.get(`/team/${teamId}`);

    return res.data;
  } catch (e) {
    throw new Error();
  }
};

export function deletePokeFromFavorite(favUserId: number, favPokeId: number) {
  dbApi.post(`/favorite/deletfav/`, { favUserId, favPokeId });
  console.log("deleted");
}

export const getfavList = async (userId: number): Promise<any> => {
  try {
    let res = await dbApi.get(`/user/${userId}`);

    return res.data.favlist;
    // wait for all request to finish
  } catch (e) {}
};

export const addFav = async (
  favUserId: number,
  favPokeId: number
): Promise<any> => {
  let favarate = {
    favUserId,
    favPokeId,
  };

  try {
    let res = await dbApi.post("/favorite", favarate);

    // console.log(res.data)
    return res.data;
  } catch (e) {}
};

export class TeamNew {
  userId: number;
  teamName: string;
}
export function createTeam(team: TeamNew) {
  return dbApi.post(`/team`, {
    teamUserId: team.userId,
    teamName: team.teamName,
  });
}
export function deleteTeam(teamId: number) {
  dbApi.delete(`/team/${teamId}`);
  console.log("Success deleted!");
}

export function addPokeToTeam(teamId: any, pokeId: number) {
  try {
    dbApi.post(`/team/addpoke`, {
      teamListTeamId: teamId,
      teamPokeId: pokeId,
    });
    console.log("Success submitted");
  } catch (e) {
    console.log(e);
  }
}

export function deletePokeFromTeam(id: number) {
  try {
    dbApi.delete(`/team/deletpoke/${id}`);
    console.log("delete success!");
  } catch (e) {
    console.log(e);
  }
}
