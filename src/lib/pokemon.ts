export interface Pokemon {
  id: string;
  name: string;
  imageURL: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  evolutions: string[];
  preEvolution: string;
  userCreated: boolean;
  types: [PokemonType];
}

export interface PartialPokemon {
  id: string;
  name: string;
  imageURL: string;
  userCreated: boolean;
  types: [PokemonType];
}

export interface PokemonCreationInput {
  id?: string;
  name: string;
  imageURL?: string;
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  preEvolution?: string | undefined;
  evolutions?: string[];
  types: number[];
}

export interface PokemonType {
  id: number;
  name: string;
}
