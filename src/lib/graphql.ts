import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { parse } from "graphql";
import { gql } from "graphql-request";
import { client } from "./graphql-client";
import {
  PartialPokemon,
  Pokemon,
  PokemonCreationInput,
  PokemonType,
} from "./pokemon";

const getPokemonsQuery: TypedDocumentNode<
  {
    pokemons: PartialPokemon[];
  },
  { offset: number; limit: number }
> = parse(gql`
  query getPokemons($offset: Int, $limit: Int) {
    pokemons(offset: $offset, limit: $limit) {
      id
      name
      imageURL
      userCreated
      types {
        id
        name
      }
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
      types {
        id
        name
      }
    }
  }
`);

const getTypesQuery: TypedDocumentNode<{ getAllTypes: PokemonType[] }> = parse(
  gql`
    query getTypes {
      getAllTypes {
        id
        name
      }
    }
  `
);

const getByType: TypedDocumentNode<{ getByType: PartialPokemon[] }> = parse(
  gql`
    query findByType($types: [String!]!) {
      getByType(types: $types) {
        id
        name
        imageURL
        userCreated
        types {
          name
        }
      }
    }
  `
);

const getNames: TypedDocumentNode<{ pokemons: { name: string }[] }> = parse(gql`
  query getPokemons {
    pokemons {
      name
    }
  }
`);

const getPokemonsByName: TypedDocumentNode<{ findbyName: PartialPokemon[] }> =
  parse(
    gql`
      query getByName($name: String!) {
        findbyName(name: $name) {
          id
          name
          imageURL
          userCreated
          types {
            id
            name
          }
        }
      }
    `
  );

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
): Promise<PartialPokemon[]> => {
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
    const res = await client.request(getPokemon, { name });
    return res.pokemon;
  } catch (err) {
    console.log(err);
    return null;
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

export const getPokemonTypes = async (): Promise<PokemonType[]> => {
  try {
    const res = await client.request(getTypesQuery);
    return res.getAllTypes;
  } catch (err) {
    return [];
  }
};

export const findPokemonByType = async (
  types: string[]
): Promise<PartialPokemon[]> => {
  try {
    const res = await client.request(getByType, { types });
    return res.getByType;
  } catch (err) {
    return [];
  }
};

export const getAllNames = async (): Promise<string[]> => {
  try {
    const res = await client.request(getNames);
    return res.pokemons.map((names) => names.name);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const findPokemonsByName = async (
  name: string
): Promise<PartialPokemon[]> => {
  try {
    const res = await client.request(getPokemonsByName, { name });
    console.log(res);
    return res.findbyName;
  } catch (err) {
    return [];
  }
};
