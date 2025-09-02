import { FC } from "react";

import ButtonActionTable from "@/components/organisms/ButtonActionTable";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_LISTING_COLUMNS } from "@/constant";
import { dateFormat } from "@/lib/utils";
import { Job } from "@prisma/client";
import moment from "moment";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { authOptions } from "@/lib/authOptions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVerticalIcon } from "lucide-react";

interface JobListingsPageProps {}

export const revalidate = 0;

async function getDataJobs() {
  const session = await getServerSession(authOptions);

  const jobs = prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  });

  return jobs;
}

const JobListingsPage: FC<JobListingsPageProps> = async ({}) => {
  const jobs = await getDataJobs();

  return (
    <div>
      <div className="text-3xl font-semibold">Job Listings</div>

      <div className="mt-10">
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
            {jobs.map((item: Job, i: number) => (
              <TableRow key={item.roles + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  {moment(item.datePosted).isBefore(item.dueDate) ? (
                    <Badge>Live</Badge>
                  ) : (
                    <Badge variant="destructive">Expired</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {moment(item.datePosted).format("Do MMMM yyyy")}
                </TableCell>
                <TableCell>
                  {moment(item.dueDate).format("Do MMMM yyyy")}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreVerticalIcon className="h-4 w-4 hover:cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col gap-4">
                        <ButtonActionTable
                          url={`/job-detail/${item.id}`}
                          description="Detail"
                        />
                        <ButtonActionTable
                          url={`/job-detail/${item.id}`}
                          description="Update"
                        />
                        <ButtonActionTable
                          url={`/job-detail/${item.id}`}
                          description="Detail"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListingsPage;
