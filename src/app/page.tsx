"use client";

import { PokemonCard } from "@/components/PokemonCard";
import { fetchPokemons, removePokemon } from "@/lib/graphql";
import { Pokemon } from "@/lib/pokemon";
import { Card, Flex, Pagination } from "antd";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [maxPerPage, setMaxPerPage] = useState(10);
  const [current, setCurrent] = useState(1);

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
    removePokemon(id).then((res) => {
      fetchPokemons((current - 1) * maxPerPage, maxPerPage).then((d) =>
        setPokemons(d)
      );
    });
  };

  return (
    <div>
      <Flex wrap="wrap" gap="middle">
        {pokemons.length
          ? pokemons.map((p) => (
              <PokemonCard pokemon={p} remove={handleRemove} key={p.id} />
            ))
          : Array.from({ length: maxPerPage }, (_, idx) => (
              <Card loading style={{ height: 400, width: 350 }} key={idx} />
            ))}
      </Flex>
      <div className="flex justify-center">
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangeHandler}
          total={900}
        />
      </div>
    </div>
  );
}
