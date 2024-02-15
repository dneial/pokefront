"use client";
import PokeForm from "@/components/PokeForm";
import { fetchPokemon } from "@/lib/graphql";
import { Pokemon, PokemonCreationInput } from "@/lib/pokemon";
import { useEffect, useState } from "react";

interface EditProps {
  pokemon?: Pokemon;
}
export default function EditPokemon({
  params,
  props,
}: {
  params: { name: string };
  props: EditProps;
}) {
  const name = decodeURI(params.name);
  const [pokemon, setPokemon] = useState(props?.pokemon);

  useEffect(() => {
    async function fetch() {
      const data = await fetchPokemon(name);
      setPokemon(data);
    }
    if (!pokemon) {
      fetch();
    }
  }, [name, pokemon]);

  const onFinish = async (input: PokemonCreationInput) => {
    console.log(input);
  };
  return (
    <PokeForm
      onFinish={onFinish}
      values={{
        name: pokemon?.name || name,
        attack: pokemon?.attack,
        hp: pokemon?.hp,
        defense: pokemon?.defense,
        speed: pokemon?.speed,
        imageURL: pokemon?.imageURL,
      }}
    ></PokeForm>
  );
}
