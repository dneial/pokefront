"use client";
import { PokemonCreationInput } from "@/lib/pokemon";
import { Button, Form, Input, InputNumber } from "antd";
import { useFormStatus } from "react-dom";

interface PokeFormProps {
  onFinish: (input: PokemonCreationInput) => void;
  values?: PokemonCreationInput;
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
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "enter a name for your pokemon" }]}
        initialValue={values?.name || ""}
      >
        <Input placeholder="name" accept="string"></Input>
      </Form.Item>

      <Form.Item
        name="hp"
        label="HP"
        initialValue={values?.hp || 1}
        rules={[
          { required: true, message: "enter an HP value for your pokemon" },
        ]}
      >
        <InputNumber placeholder="hp"></InputNumber>
      </Form.Item>

      <Form.Item
        name="attack"
        label="Attack value"
        initialValue={values?.attack || 1}
        rules={[
          { required: true, message: "enter an attack value for your pokemon" },
        ]}
      >
        <InputNumber placeholder="attack"></InputNumber>
      </Form.Item>

      <Form.Item
        name="defense"
        label="Defense value"
        initialValue={values?.defense || 1}
        rules={[
          { required: true, message: "enter a defense value for your pokemon" },
        ]}
      >
        <InputNumber placeholder="defense"></InputNumber>
      </Form.Item>

      <Form.Item
        name="speed"
        label="Speed value"
        initialValue={values?.defense || 1}
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
        initialValue={values?.imageURL}
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
