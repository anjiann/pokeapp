import { pokeApi } from "../httpService";

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
