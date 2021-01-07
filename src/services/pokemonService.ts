import http from "./httpService";

const apiEndpoint = "/pokemon";

function pokemonUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPokemons() {
  return http.get(apiEndpoint);
}

export function getPokemon(id) {
  return http.get(pokemonUrl(id));
}
