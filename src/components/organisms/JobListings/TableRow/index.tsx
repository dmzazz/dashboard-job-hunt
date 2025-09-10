import React, { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { MoreVerticalIcon } from "lucide-react";
import ButtonActionTable from "../../ButtonActionTable";

interface JobListingsTableCellProps {
  id: string | number;
  roles: string;
  datePosted: string | Date;
  dueDate: string | Date;
  jobType: string;
  applicants: number;
  needs: number;
  i: number;
}

const JobListingsTableRow: FC<JobListingsTableCellProps> = ({
  id,
  roles,
  datePosted,
  dueDate,
  jobType,
  applicants,
  needs,
  i,
}) => {
  return (
    <TableRow key={roles + i}>
      <TableCell>{roles}</TableCell>
      <TableCell>
        {moment(datePosted).isBefore(dueDate) ? (
          <Badge className="bg-green-500">Live</Badge>
        ) : (
          <Badge variant="destructive">Expired</Badge>
        )}
      </TableCell>
      <TableCell>{moment(datePosted).format("Do MMMM yyyy")}</TableCell>
      <TableCell>{moment(dueDate).format("Do MMMM yyyy")}</TableCell>
      <TableCell>
        <Badge variant="outline">{jobType}</Badge>
      </TableCell>
      <TableCell>{applicants}</TableCell>
      <TableCell>
        {applicants} / {needs}
      </TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger>
            <MoreVerticalIcon className="h-4 w-4 hover:cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-4">
              <ButtonActionTable
                url={`/job-detail/${id}`}
                description="Detail"
              />
              <ButtonActionTable
                url={`/job-detail/${id}`}
                description="Update"
              />
              <ButtonActionTable
                url={`/job-detail/${id}`}
                description="Detail"
              />
            </div>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
};

export default JobListingsTableRow;
