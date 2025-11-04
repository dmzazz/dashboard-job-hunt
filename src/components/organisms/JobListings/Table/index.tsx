import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Job } from "@prisma/client";
import { FC } from "react";
import JobListingsTableHeader from "../TableHeader";
import JobListingsTableRow from "../TableRow";

interface JobListingsTableProps {
  jobs: Job[];
  sortBy?: string;
  orderBy?: "asc" | "desc";
}

const JobListingsTable: FC<JobListingsTableProps> = ({
  jobs,
  sortBy,
  orderBy,
}) => {
  if (!jobs || jobs.length === 0) {
    return (
      <Table>
        <JobListingsTableHeader sortBy={sortBy} orderBy={orderBy} />

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
      <JobListingsTableHeader sortBy={sortBy} orderBy={orderBy} />

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
