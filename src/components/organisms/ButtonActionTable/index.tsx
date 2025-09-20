"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { BiDetail, BiEditAlt } from "react-icons/bi";

interface ButtonActionTableProps {
  url: string;
  description: string;
  icon: string;
}

const icons: Record<string, ReactNode> = {
  detail: <BiDetail />,
  update: <BiEditAlt />,
};

const ButtonActionTable: FC<ButtonActionTableProps> = ({
  url,
  description,
  icon,
}) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(url)}
      variant="outline"
      className="flex gap-1"
    >
      {icons[icon] ?? null}
      {description}
    </Button>
  );
};

export default ButtonActionTable;
