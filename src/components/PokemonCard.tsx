import { Pokemon } from "@/lib/pokemon";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const pokemon: Pokemon = props.pokemon;
  return (
    <Card title={pokemon.name} hoverable>
      <Link href={`/pokemon/${pokemon.name}`}>
        <Image
          src={pokemon.imageURL}
          alt={pokemon.name}
          width={300}
          height={300}
        ></Image>
      </Link>
    </Card>
  );
};
