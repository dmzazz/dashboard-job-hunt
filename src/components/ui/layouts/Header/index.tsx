"use client";

import { fetcher } from "@/lib/utils";
import { Menu, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton";

type CompanyName = {
  name: string;
};

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarVisible: boolean;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  isVisibleElement: boolean;
}

export const Header: FC<HeaderProps> = ({
  isOpen,
  setIsOpen,
  isSidebarVisible,
  setIsSidebarVisible,
  isVisibleElement,
}) => {
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
        {/* Company title */}
        <div>{companyName || "Company Name"}</div>

        {status === "loading" ? (
          <Skeleton className="mt-1 h-5 w-36" />
        ) : (
          <div className="font-semibold">{session?.user.name}</div>
        )}
      </div>

      {isVisibleElement ? (
        <div className="rounded-none px-6 py-3">
          <Button onClick={navCreateJobPAge}>
            <PlusIcon className="2-4 mr-2 h-4" />
            Post a job
          </Button>
        </div>
      ) : (
        <Button variant="ghost"
          onClick={() => {
            setIsSidebarVisible(!isSidebarVisible);
            setIsOpen(!isOpen);
          }}
        >
          <Menu />
        </Button>
      )}
    </div>
  );
};
