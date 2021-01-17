import { pokeApi } from "../httpService";
import { Pokemon } from "../../models/Pokemon";
import { generationUrl } from "./generationService";
import { typeUrl } from "./typeService";

const apiEndpoint = "/pokemon";

function pokemonUrl(identifier: any) {
  return `${apiEndpoint}/${identifier}`;
}

export const getPokemons = async (
  offset: number = 0,
  limit: number = 2000
): Promise<Pokemon[]> => {
  try {
    const options = {
      params: {
        offset,
        limit,
      },
    };
    let { data } = await pokeApi.get(apiEndpoint, options);

    //batch api calls
    let pokemons: Promise<Pokemon>[] = data.results.map((ele: any) => {
      return getPokemon(ele.name);
    });

    //wait for all requests to finish
    return await Promise.all(pokemons);
  } catch (e) {
    throw new Error();
  }
};

export const getPokemon = async (identifier: string): Promise<Pokemon> => {
  try {
    let { data } = await pokeApi.get(pokemonUrl(identifier));

    let pokemon = new Pokemon();
    pokemon.id = data.id;
    pokemon.name = data.name;
    pokemon.picture = data.sprites.front_default;
    pokemon.weight = data.weight;
    pokemon.type = [
      data.types[0].type.name,
      data.types[1] && data.types[1].type.name,
    ];
    return pokemon;
  } catch (e) {
    throw new Error();
  }
};

export const getPokemonByGeneration = async (
  identifier: any
): Promise<Pokemon[]> => {
  try {
    let res = await pokeApi.get(generationUrl(identifier));

    let pokemons: Promise<Pokemon>[] = res.data.pokemon_species.map(
      (ele: any) => {
        return getPokemon(ele.name);
      }
    );

    return await Promise.all(pokemons);
  } catch (e) {
    throw new Error();
  }
};

export const getPokemonByType = async (identifier: any): Promise<Pokemon[]> => {
  try {
    let res = await pokeApi.get(typeUrl(identifier));

    let pokemons: Promise<Pokemon>[] = res.data.pokemon.map((ele: any) => {
      return getPokemon(ele.pokemon.name);
    });

    return await Promise.all(pokemons);
  } catch (e) {
    throw new Error();
  }
};

export const getPokemonBySearch = async (input: string): Promise<Pokemon[]> => {
  try {
    let res = await pokeApi.get("/pokemon");

    let pokemons: Promise<Pokemon>[] = res.data.results.map((ele: any) => {
      let tmp = ele.name.startsWith(input);

      if (tmp) {
        return getPokemon(ele.name);
      }
    });

    return await Promise.all(pokemons);
  } catch (e) {
    throw new Error();
  }
};
