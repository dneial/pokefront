import { Pokemon } from "@/lib/pokemon";
import { Card } from "antd";
import Link from "next/link";

export default function PokemonNoImage(props: { pokemon: Pokemon }) {
  const pokemon: Pokemon = props.pokemon;

  <Card title={pokemon.name} hoverable>
    <Link href={`/pokemon/${pokemon.name}`}></Link>
  </Card>;
}
