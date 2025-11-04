"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JOB_LISTING_COLUMNS } from "@/constant";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

interface JobListingsTableHeaderProps {
  sortBy?: string;
  orderBy?: "asc" | "desc";
}

const JobListingsTableHeader: FC<JobListingsTableHeaderProps> = ({
  sortBy,
  orderBy,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortByColumn = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const sortBy = params.get("sortBy");
    const orderBy = params.get("orderBy") || "asc";

    if (sortBy === key) {
      const toggle = orderBy === "asc" ? "desc" : "asc";
      params.set("orderBy", toggle);
    } else {
      params.set("sortBy", key);
      params.set("orderBy", "asc");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <TableHeader>
      <TableRow>
        {JOB_LISTING_COLUMNS.map(({ key, label }) => {
          const isActiveColumn = sortBy === key;
          const sortIcon = !isActiveColumn ? (
            <ArrowUpDown size={14} />
          ) : orderBy === "asc" ? (
            <ArrowUp size={14} />
          ) : (
            <ArrowDown size={14} />
          );

          return (
            <TableHead
              key={key}
              onClick={() => handleSortByColumn(key)}
              className="cursor-pointer select-none whitespace-nowrap transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-1">
                {label} {sortIcon}
              </div>
            </TableHead>
          );
        })}

        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default JobListingsTableHeader;
