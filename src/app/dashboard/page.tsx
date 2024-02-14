"use client";

import { PokemonCard } from "@/components/PokemonCard";
import { fetchPokemons } from "@/lib/graphql";
import { Pokemon } from "@/lib/pokemon";
import { Flex, Input, Pagination } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [maxPerPage, setMaxPerPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPokemons((current - 1) * maxPerPage, maxPerPage);
      setPokemons(data);
    };
    fetch();
  }, [current, maxPerPage]);

  const onChangeHandler = (page: number, pageSize: number) => {
    setCurrent(page);
    setMaxPerPage(pageSize);
    scrollTo({ top: 0 });
  };

  return (
    <div>
      <Link href={"/create"}>Create a new pokemon</Link>
      <Input
        name="name"
        accept="string"
        onChange={(e) => setNameInput(e.target.value)}
        placeholder="Name search"
      ></Input>
      <Flex wrap="wrap" gap="middle">
        {pokemons &&
          pokemons.map(
            (p, idx) =>
              p.name.toLowerCase().includes(nameInput.toLowerCase()) && (
                <PokemonCard pokemon={p} key={idx} />
              )
          )}
      </Flex>
      <div className="flex justify-center">
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangeHandler}
          total={900}
        ></Pagination>
      </div>
    </div>
  );
}
