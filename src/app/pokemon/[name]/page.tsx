import { fetchPokemon } from "@/lib/graphql";
import { Pokemon } from "@/lib/pokemon";
import { Card, Flex } from "antd";
import Image from "next/image";
import Link from "next/link";

export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const name = decodeURI(params.name);
  const pokemon: Pokemon = await fetchPokemon(name);

  return (
    <div className="items-center">
      <Card title={pokemon.name}>
        <Image
          src={pokemon.imageURL}
          alt={pokemon.name}
          width={500}
          height={500}
        ></Image>
        <p>Pokemon name: {pokemon.name}</p>
        <p>HP: {pokemon.hp}</p>
        <p>Attack: {pokemon.attack}</p>
        <p>Defense: {pokemon.defense}</p>
        <p>Speed: {pokemon.speed}</p>
        {pokemon.preEvolution && (
          <Flex>
            <p>Pre evolution: </p>
            <Link href={`/pokemon/${pokemon.preEvolution}`}>
              {pokemon.preEvolution}
            </Link>
          </Flex>
        )}

        {pokemon.evolutions.length > 0 && <p>Evolutions</p>}
        {pokemon.evolutions &&
          pokemon.evolutions.map((p, idx) => (
            <Link href={`/pokemon/${p}`} key={idx}>
              {p}
            </Link>
          ))}
      </Card>
    </div>
  );
}
