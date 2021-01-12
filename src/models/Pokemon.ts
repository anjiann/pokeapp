export class Pokemon {
  id: number;
  name: string;
  weight: number;
  picture: string; //url to the remote photo
  type: [PokemonType, PokemonType | null];
}

export enum PokemonType {
  Flying = "flying",
  Fire = "fire",
  Normal = "normal",
  Fighting = "fighting",
  Water = "water",
  Grass = "grass",
  Poison = "poison",
  Electric = "electric",
  Ground = "ground",
  Psychic = "psychic",
  Rock = "rock",
  Ice = "ice",
  Bug = "bug",
  Dragon = "dragon",
  Ghost = "ghost",
  Dark = "dark",
  Steel = "steel",
  Fairy = "fairy",
}
