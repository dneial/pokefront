"use client";

import { PokemonCard } from "@/components/PokemonCard";
import { fetchPokemons, removePokemon } from "@/lib/graphql";
import { Pokemon } from "@/lib/pokemon";
import { Flex, Input, Pagination, Spin } from "antd";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [maxPerPage, setMaxPerPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const fetch = () => {
      fetchPokemons((current - 1) * maxPerPage, maxPerPage).then((d) =>
        setPokemons(d)
      );
    };
    fetch();
  }, [current, maxPerPage]);

  const onChangeHandler = (page: number, pageSize: number) => {
    setCurrent(page);
    setMaxPerPage(pageSize);
    scrollTo({ top: 0 });
  };

  const handleRemove = (id: string) => {
    removePokemon(id);
    setPokemons((ps) => ps.filter((p) => p.id !== id));
    fetchPokemons((current - 1) * maxPerPage, maxPerPage).then((d) =>
      setPokemons(d)
    );
  };

  return (
    <div>
      <Input
        name="name"
        accept="string"
        onChange={(e) => setNameInput(e.target.value)}
        placeholder="Name search"
      ></Input>
      {pokemons ? (
        <Flex wrap="wrap" gap="middle">
          {pokemons &&
            pokemons.map(
              (p, idx) =>
                p.name.toLowerCase().includes(nameInput.toLowerCase()) && (
                  <PokemonCard pokemon={p} key={idx} remove={handleRemove} />
                )
            )}
        </Flex>
      ) : (
        <Spin />
      )}
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
