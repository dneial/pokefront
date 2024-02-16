"use client";
import PokeForm from "@/components/PokeForm";
import { fetchPokemon, updatePokemon } from "@/lib/graphql";
import { Pokemon, PokemonCreationInput } from "@/lib/pokemon";
import { Spin, message } from "antd";
import { useRouter } from "next/navigation";
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
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Pokemon updated! Redirecting...",
    });
  };

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
    const updated = await updatePokemon({ id: pokemon!.id, ...input });
    if (updated) success();
    router.push(`/pokemon/${input.name}`);
  };

  return (
    <div className="inline-block">
      {contextHolder}
      {pokemon ? (
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
        />
      ) : (
        <Spin />
      )}
    </div>
  );
}
