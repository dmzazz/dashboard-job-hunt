"use client";

import { fetcher } from "@/lib/utils";
import { Company } from "@prisma/client";
import React, { FC, useEffect } from "react";
import useSWR from "swr";

interface CompanyProfileProps {}

const CompanyProfile: FC<CompanyProfileProps> = ({}) => {
  const { data, isLoading, error } = useSWR<Company[]>(
    "/api/company/profile",
    fetcher,
  );
  console.log(data);

  return <div>Company profile</div>;
};

export default CompanyProfile;
