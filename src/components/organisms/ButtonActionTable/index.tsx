"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ButtonActionTableProps {
  url: string;
  description: string;
}

const ButtonActionTable: FC<ButtonActionTableProps> = ({
  url,
  description,
}) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(url)} variant="outline">
      {description}
    </Button>
  );
};

export default ButtonActionTable;
