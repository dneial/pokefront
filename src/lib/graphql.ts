import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { parse } from "graphql";
import { gql } from "graphql-request";
import { client } from "./graphql-client";
import { Pokemon, PokemonCreationInput } from "./pokemon";

const getPokemonsQuery: TypedDocumentNode<
  {
    pokemons: Pokemon[];
  },
  { offset: number; limit: number }
> = parse(gql`
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
      preEvolution
      userCreated
    }
  }
`);

const getPokemon: TypedDocumentNode<
  {
    pokemon: Pokemon;
  },
  { name: string }
> = parse(gql`
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
      preEvolution
      userCreated
    }
  }
`);

const createPokemonMutation: TypedDocumentNode<
  { createPokemon: { name: string } },
  {
    input: PokemonCreationInput;
  }
> = parse(
  gql`
    mutation create($input: CreatePokemonInput!) {
      createPokemon(createPokemonInput: $input) {
        name
      }
    }
  `
);

const updatePokemonMutation: TypedDocumentNode<
  { updatePokemon: { name: string } },
  { input: PokemonCreationInput }
> = parse(
  gql`
    mutation update($in: UpdatePokemonInput!) {
      updatePokemon(updatePokemonInput: $in) {
        name
      }
    }
  `
);

export const fetchPokemons = async (
  offset: number,
  limit: number
): Promise<Pokemon[]> => {
  const variables = { offset, limit };
  try {
    const res = await client.request(getPokemonsQuery, variables);
    return res.pokemons;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  try {
    console.log("fetching: ", name);
    const res = await client.request(getPokemon, { name });
    return res.pokemon;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const createPokemon = async (
  input: PokemonCreationInput
): Promise<string> => {
  console.log(input);

  try {
    const res = await client.request(createPokemonMutation, { input });
    return res.createPokemon.name;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const updatePokemon = async (
  input: PokemonCreationInput
): Promise<string> => {
  try {
    const res = await client.request(updatePokemonMutation, { input });
    return res.updatePokemon.name;
  } catch (err) {
    console.log(err);
    return;
  }
};
