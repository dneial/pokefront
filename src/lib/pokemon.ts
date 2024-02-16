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
}
