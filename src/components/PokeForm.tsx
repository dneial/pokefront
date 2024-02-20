"use client";
import { getPokemonTypes } from "@/lib/graphql";
import { PokemonCreationInput, PokemonType } from "@/lib/pokemon";
import { Button, Form, Input, Select, Slider } from "antd";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface PokeFormProps {
  onFinish: (input: PokemonCreationInput) => void;
  values?: PokemonCreationInput;
}
function SelectType({ onChange }: { onChange?: () => void }) {
  const [types, setTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    getPokemonTypes().then((res) => setTypes(res));
  }, []);

  return (
    types && (
      <Select
        mode="multiple"
        options={types.map((t) => ({ label: t.name, value: t.id }))}
        allowClear
        placeholder="Select at least one type"
        onChange={onChange}
      />
    )
  );
}

export default function PokeForm(props: PokeFormProps) {
  const onFinish = props.onFinish;
  const values = props.values;
  const { pending } = useFormStatus();

  return (
    <Form
      name="Create a pokemon"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: 50 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Enter a name for your pokemon" },
          { pattern: new RegExp("^[A-Za-z]*$"), message: "Invalid name" },
        ]}
        initialValue={values?.name || ""}
      >
        <Input placeholder="name" accept="string" allowClear></Input>
      </Form.Item>

      <Form.Item
        name="hp"
        label="HP"
        initialValue={values?.hp || 1}
        rules={[
          { required: true, message: "enter an HP value for your pokemon" },
        ]}
      >
        <Slider tooltip={{ open: true }}></Slider>
      </Form.Item>

      <Form.Item
        name="attack"
        label="Attack value"
        initialValue={values?.attack || 1}
        rules={[
          { required: true, message: "enter an attack value for your pokemon" },
        ]}
      >
        <Slider tooltip={{ open: true }}></Slider>
      </Form.Item>

      <Form.Item
        name="defense"
        label="Defense value"
        initialValue={values?.defense || 1}
        rules={[
          { required: true, message: "enter a defense value for your pokemon" },
        ]}
      >
        <Slider tooltip={{ open: true }}></Slider>
      </Form.Item>

      <Form.Item
        name="speed"
        label="Speed value"
        initialValue={values?.speed || 1}
        rules={[
          { required: true, message: "enter a speed value for your pokemon" },
        ]}
      >
        <Slider tooltip={{ open: true }}></Slider>
      </Form.Item>

      <Form.Item
        name="types"
        label="Types"
        rules={[{ required: false, message: "Choose at least one type" }]}
      >
        <SelectType />
      </Form.Item>

      <Form.Item
        name="imageURL"
        label="Image"
        rules={[{ type: "url", warningOnly: false }]}
        initialValue={values?.imageURL}
        tooltip={{ title: "Leave blank to use default image" }}
      >
        <Input placeholder="image url" accept="string" allowClear></Input>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={pending}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
