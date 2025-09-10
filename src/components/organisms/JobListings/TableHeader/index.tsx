import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JOB_LISTING_COLUMNS } from "@/constant";
import React, { FC } from "react";

interface JobListingsTableHeaderProps {}

const JobListingsTableHeader: FC<JobListingsTableHeaderProps> = ({}) => {
  return (
    <TableHeader>
      <TableRow>
        {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
          <TableHead key={item + i}>{item}</TableHead>
        ))}
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default JobListingsTableHeader;
