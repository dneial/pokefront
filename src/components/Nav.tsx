"use client";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const items: MenuProps["items"] = [
    {
      label: <Link href={"/dashboard"}>Home</Link>,
      key: "/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: <Link href={"/create"}>Create a new pokemon</Link>,
      key: "/create",
      icon: <PlusOutlined />,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="bg-red-700">
      <Menu mode="horizontal" selectedKeys={[pathname]} items={items} />
    </div>
  );
}
