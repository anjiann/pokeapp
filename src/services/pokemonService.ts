import http from "./httpService";

const apiEndpoint = "/pokemon";

function pokemonUrl(id: Number) {
  return `${apiEndpoint}/${id}`;
}

export function getPokemons() {
  return http.get(apiEndpoint);
}

export function getPokemon(id: Number) {
  return http.get(pokemonUrl(id));
}
