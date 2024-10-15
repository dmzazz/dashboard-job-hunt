"use client"

import React, { FC } from "react";
import { Button } from "../../button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {

  const router = useRouter()

  const navCreateJobPAge = () => router.push("/post-a-job")
  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div>
        <div>Company</div>
        <div className="font-semibold">Twitter</div>
      </div>
      <div className="rounded-none py-3 px-6">
        <Button onClick={navCreateJobPAge}>
          <PlusIcon className="mr-2 2-4 h-4" />
          Post a job
        </Button>
      </div>
    </div>
  );
};
