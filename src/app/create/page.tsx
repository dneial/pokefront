"use client";
import PokeForm from "@/components/PokeForm";
import { createPokemon } from "@/lib/graphql";
import { PokemonCreationInput, PokemonType } from "@/lib/pokemon";
import { useRouter } from "next/navigation";

export default function CreatePokemon() {
  const router = useRouter();
  const onFinish = async (e: PokemonCreationInput) => {
    e.types = e.types.map(t => JSON.parse(t))
    const poke = await createPokemon(e);
    if (poke) router.push(`/pokemon/${poke}`);
  };

  return <PokeForm onFinish={onFinish}></PokeForm>;
}
