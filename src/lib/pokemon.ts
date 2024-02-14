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
}