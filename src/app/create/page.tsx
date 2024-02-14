"use client";
import { createPokemon } from "@/lib/graphql";
import { PokemonCreationInput } from "@/lib/pokemon";
import { Button, Form, Input, InputNumber } from "antd";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function CreatePokemon() {
  const { pending } = useFormStatus();

  const router = useRouter();
  const onFinish = async (e: PokemonCreationInput) => {
    console.log(e);
    const poke = await createPokemon(e);
    if (poke) router.push(`/pokemon/${poke}`);
  };

  return (
    <Form
      name="Create a pokemon"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "enter a name for your pokemon" }]}
      >
        <Input required placeholder="name" accept="string"></Input>
      </Form.Item>

      <Form.Item
        name="hp"
        label="HP"
        initialValue={1}
        rules={[
          { required: true, message: "enter an HP value for your pokemon" },
        ]}
      >
        <InputNumber placeholder="hp"></InputNumber>
      </Form.Item>

      <Form.Item
        name="attack"
        label="Attack value"
        initialValue={0}
        rules={[
          { required: true, message: "enter an attack value for your pokemon" },
        ]}
      >
        <InputNumber placeholder="attack"></InputNumber>
      </Form.Item>

      <Form.Item
        name="defense"
        label="Defense value"
        initialValue={0}
        rules={[
          { required: true, message: "enter a defense value for your pokemon" },
        ]}
      >
        <InputNumber placeholder="defense"></InputNumber>
      </Form.Item>

      <Form.Item
        name="speed"
        label="Speed value"
        initialValue={0}
        rules={[
          { required: true, message: "enter a speed value for your pokemon" },
        ]}
      >
        <InputNumber placeholder="speed"></InputNumber>
      </Form.Item>

      <Form.Item
        name="imageURL"
        label="Image"
        rules={[{ type: "url", warningOnly: false }]}
      >
        <Input placeholder="image url" accept="string"></Input>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={pending}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
