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
import JobListingsTableHeader from "../TableHeader";

interface JobListingsTableProps {
  jobs: Job[];
}

const JobListingsTable: FC<JobListingsTableProps> = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <Table>
        <JobListingsTableHeader />

        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              You have not added any jobs yet.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <JobListingsTableHeader />

      <TableBody>
        {jobs.map((job, i) => (
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
