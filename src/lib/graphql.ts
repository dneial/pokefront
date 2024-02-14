import { gql } from "graphql-request";
import { client } from "./graphql-client";
import { Pokemon } from "./pokemon";

export const getPokemons = gql`
  query getPokemons($offset: Int, $limit: Int) {
    pokemons(offset: $offset, limit: $limit) {
      id
      name
      imageURL
      hp
      attack
      defense
      speed
      evolutions
      preEvolutions
    }
  }
`;

export const getPokemon = `
    query getPokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            imageURL
            hp
            attack
            defense
            speed
            evolutions
            preEvolutions
        }
    }
`;

export const fetchPokemons = async (
  offset: number,
  limit: number
): Promise<Pokemon[]> => {
  const variables = { offset, limit };
  try {
    const pokemons = await client.request(getPokemons, variables);
    console.log("here");
    console.log(pokemons);
    return pokemons;
  } catch (err) {
    return;
  }
};
