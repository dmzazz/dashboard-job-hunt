"use client";

import React, { FC, useState } from "react";
import { Button } from "../../button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "../../skeleton";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const navCreateJobPAge = () => router.push("/post-a-job");
  return (
    <div className="mb-8 flex flex-row items-center justify-between border-b border-border pb-3">
      <div>
        <div>Company</div>
        {status === "loading" ? (
          <Skeleton className="h-6 w-36" />
        ) : (
          <div className="font-semibold">{session?.user.name}</div>
        )}
      </div>
      <div className="rounded-none px-6 py-3">
        <Button onClick={navCreateJobPAge}>
          <PlusIcon className="2-4 mr-2 h-4" />
          Post a job
        </Button>
      </div>
    </div>
  );
};
