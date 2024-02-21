"use client";

import { PokemonCard } from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import {
  fetchPokemons,
  findPokemonByType,
  findPokemonsByName,
  removePokemon,
} from "@/lib/graphql";
import { PartialPokemon } from "@/lib/pokemon";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Pagination, Tag } from "antd";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [pokemons, setPokemons] = useState<PartialPokemon[]>([]);
  const [maxPerPage, setMaxPerPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = (
    current: number,
    maxPerPage: number,
    selectedTags: string[]
  ) => {
    if (selectedTags.length <= 0) {
      setLoading(true);
      fetchPokemons((current - 1) * maxPerPage, maxPerPage).then((d) => {
        setPokemons(d);
        setLoading(false);
      });
    } else {
      findPokemonByType(selectedTags).then((d) => {
        setPokemons(d);
        setLoading(false);
      });
    }
  };
  useEffect(() => {
    fetch(current, maxPerPage, selectedTags);
  }, [current, maxPerPage, selectedTags]);

  const onChangeHandler = (page: number, pageSize: number) => {
    setCurrent(page);
    setMaxPerPage(pageSize);
    scrollTo({ top: 0 });
  };

  const handleRemove = (id: string) => {
    removePokemon(id).then((res) => {
      fetch(current, maxPerPage, selectedTags);
    });
  };

  const selectTag = (t: string) => {
    if (!selectedTags.find((tg) => t === tg))
      setSelectedTags((tags) => [...tags, t]);
  };

  const removeTag = (t: string) => {
    setSelectedTags((tags) => tags.filter((tg) => tg !== t));
  };

  const onSearch = (input?: string) => {
    if (input) findPokemonsByName(input).then((ps) => setPokemons(ps));
  };

  const onClear = () => {
    fetch(current, maxPerPage, selectedTags);
  };
  return (
    <div>
      <SearchBar onSearch={onSearch} onClear={onClear} />
      {selectedTags.length > 0 && (
        <div>
          <Button onClick={() => setSelectedTags([])}>Clear all</Button>
        </div>
      )}
      {selectedTags.map((t) => (
        <Tag
          key={t}
          closeIcon={<CloseCircleOutlined />}
          onClose={() => removeTag(t)}
        >
          {t}
        </Tag>
      ))}
      <Flex wrap="wrap" gap="middle">
        {pokemons.length
          ? pokemons.map((p) => (
              <PokemonCard
                pokemon={p}
                remove={handleRemove}
                key={p.id}
                selectTag={selectTag}
              />
            ))
          : Array.from({ length: maxPerPage }, (_, idx) => (
              <Card loading style={{ height: 400, width: 350 }} key={idx} />
            ))}
      </Flex>

      {selectedTags.length === 0 && (
        <div className="flex justify-center">
          <Pagination
            current={current}
            showSizeChanger
            onChange={onChangeHandler}
            total={900}
          />
        </div>
      )}
    </div>
  );
}
