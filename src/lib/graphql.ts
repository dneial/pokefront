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
  { updatePokemon: boolean },
  { input: PokemonCreationInput }
> = parse(
  gql`
    mutation update($input: UpdatePokemonInput!) {
      updatePokemon(updatePokemonInput: $input)
    }
  `
);

const removePokemonMutation: TypedDocumentNode<
  { removePokemon: boolean },
  { id: string }
> = parse(
  gql`
    mutation remove($id: String!) {
      removePokemon(id: $id)
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

export const fetchPokemon = async (
  name: string,
  from: string
): Promise<Pokemon> => {
  try {
    console.log("fetching: ", name, " from : ", from);
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
  try {
    const res = await client.request(createPokemonMutation, { input });
    return res.createPokemon.name;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const updatePokemon = async (
  input: PokemonCreationInput
): Promise<boolean> => {
  try {
    const res = await client.request(updatePokemonMutation, { input });
    return res.updatePokemon;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const removePokemon = async (id: string): Promise<boolean> => {
  try {
    const res = await client.request(removePokemonMutation, { id });
    return res.removePokemon;
  } catch (err) {
    console.log(err);
    return false;
  }
};
