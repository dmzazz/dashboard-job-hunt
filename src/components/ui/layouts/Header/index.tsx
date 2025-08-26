"use client";

import { fetcher } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton";

interface HeaderProps {}

type CompanyName = {
  name: string;
};

export const Header: FC<HeaderProps> = ({}) => {
  const [companyName, setCompanyName] = useState<string | null>("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data } = useSWR<CompanyName[]>("api/company/overview", fetcher);

  // Check if company name is already exist
  useEffect(() => {
    if (getCompanyName) {
      setCompanyName(getCompanyName);
    }
  }, []);

  // Save company name to localStorage
  useEffect(() => {
    if (data && data[0]?.name) {
      localStorage.setItem("company-name", data[0].name);
      setCompanyName(data[0].name);
    }
  }, [data]);

  // Get company name from localStorage
  const getCompanyName = localStorage.getItem("company-name");

  const navCreateJobPAge = () => router.push("/post-a-job");

  return (
    <div className="mb-8 flex flex-row items-center justify-between border-b border-border pb-3">
      <div>
        <div>{companyName || "Company Name"}</div>

        {status === "loading" ? (
          <Skeleton className="mt-1 h-5 w-36" />
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
