"use client";
import { Pokemon } from "@/lib/pokemon";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, message } from "antd";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  pokemon: Pokemon;
  remove: (id: string) => void;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const pokemon: Pokemon = props.pokemon;
  const router = useRouter();

  const [messageApi, context] = message.useMessage();

  const success = () => {
    props.remove(pokemon.id);
    messageApi
      .open({
        type: "loading",
        content: "Removing pokemon...",
        duration: 1.5,
      })
      .then(() => message.success("Pokemon removed", 1));
  };

  return (
    <ErrorBoundary
      errorComponent={({ error }) => <FallBack pokemon={pokemon}></FallBack>}
    >
      <Card
        title={pokemon.name}
        hoverable
        actions={[
          pokemon.userCreated && (
            <EditOutlined
              key={"/edit"}
              onClick={() => {
                router.push(`/pokemon/${pokemon.name}/edit`);
              }}
            />
          ),
          pokemon.userCreated && (
            <>
              {context}
              <DeleteOutlined key={"/delete"} onClick={() => success()} />
            </>
          ),
        ]}
      >
        <Link href={`/pokemon/${pokemon.name}`}>
          <Image
            src={pokemon.imageURL}
            alt={pokemon.name}
            width={300}
            height={300}
          ></Image>
        </Link>
      </Card>
    </ErrorBoundary>
  );
};
const DEFAULT_IMAGE_URL =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png/v1/fit/w_454,h_340,q_70,strp/who_s_that_pokemon__by_amitlu89_d47rmjf-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzQwIiwicGF0aCI6IlwvZlwvMTJlY2I3YWUtNzA1OS00OGRmLWE0ZjgtMmUzZmI3ODU4NjA2XC9kNDdybWpmLWRlODhhNTc0LTQ5YzgtNGRjZi05ZGY0LTdlMTE3MjJlOGJlYy5wbmciLCJ3aWR0aCI6Ijw9NDU0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Gg82YjPgXVwCwe3b1FVZnPvC8UtnL37AG9AqdPVzz50";
const FallBack = (props: PokemonCardProps) => {
  const pokemon: Pokemon = props.pokemon;
  const router = useRouter();
  return (
    <Card
      title={pokemon.name}
      hoverable
      actions={[
        pokemon.userCreated && (
          <EditOutlined
            key={"/edit"}
            onClick={() => {
              router.push(`/pokemon/${pokemon.name}/edit`);
            }}
          />
        ),
        pokemon.userCreated && <DeleteOutlined key={"/delete"} />,
      ]}
    >
      <Link href={`/pokemon/${pokemon.name}`}>
        <Image
          src={DEFAULT_IMAGE_URL}
          alt={pokemon.name}
          width={300}
          height={300}
        ></Image>
      </Link>
    </Card>
  );
};
