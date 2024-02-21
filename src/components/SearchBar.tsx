import { getAllNames } from "@/lib/graphql";
import { AutoComplete, Button } from "antd";
import { useEffect, useState } from "react";

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});
export default function SearchBar({
  onSearch,
  onClear,
}: {
  onSearch: (input?: string) => void;
  onClear: () => void;
}) {
  const [names, setNames] = useState<{ value: string }[]>([]);
  const [options, setOptions] = useState<{ value: string }[]>();
  const [input, setInput] = useState<string>();
  useEffect(() => {
    getAllNames().then((names) => {
      const values = names.map((n) => ({ value: n }));
      setNames(values);
      setOptions(values);
    });
  }, []);

  const getPanelValue = (searchText: string) => {
    setInput(searchText);
    return !searchText
      ? names
      : names.filter((n) =>
          n.value.toLowerCase().includes(searchText.toLowerCase())
        );
  };

  const myOnClear = () => {
    setOptions(names);
    onClear();
  };

  const onSelect = (value: string) => {
    setInput(value);
  };

  return (
    <div>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSearch={(text) => setOptions(getPanelValue(text))}
        placeholder="input here"
        allowClear
        onClear={myOnClear}
        onSelect={onSelect}
      />
      <Button onClick={() => onSearch(input)}>Search</Button>
    </div>
  );
}
