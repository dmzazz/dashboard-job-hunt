import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_LISTING_COLUMNS } from "@/constant";
import { Job } from "@prisma/client";
import JobListingsTableRow from "../TableRow";

interface JobListingsTableProps {
  jobs: Job[];
}

const JobListingsTable: FC<JobListingsTableProps> = ({ jobs }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
            <TableHead key={item + i}>{item}</TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* If job data is null */}
        {jobs.length === 0 && (
          <TableCell colSpan={8} className="text-center">
            You have not added any jobs yet.
          </TableCell>
        )}

        {/* Display job data */}
        {jobs?.map((job, i) => (
          <JobListingsTableRow
            key={job.id}
            id={job.id}
            roles={job.roles}
            datePosted={job.datePosted}
            dueDate={job.dueDate}
            jobType={job.jobType}
            applicants={job.applicants}
            needs={job.needs}
            i={i}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default JobListingsTable;
