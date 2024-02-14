import { fetchPokemons } from "@/lib/graphql";
import { Pokemon } from "@/lib/pokemon";

export default async function Dashboard() {
  const pokemons: Pokemon[] = await fetchPokemons(0, 5);
  console.log("here are the pokemon", pokemons);

  return (
    <>
      <div>{"pokemons"}</div>
      {pokemons?.map((p, idx) => (
        <div key={idx}>{p.name}</div>
      ))}
    </>
  );
}
