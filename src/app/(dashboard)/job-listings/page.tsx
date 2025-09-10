import { FC } from "react";

import JobListingsTable from "@/components/organisms/JobListings/Table";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";

interface JobListingsPageProps {}

export const revalidate = 0;

async function getDataJobs() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const jobs = await prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  });

  const totalJobs = await prisma.job.count({
    where: {
      companyId: session?.user.id,
    },
  });

  return { data: { jobs, total_data: totalJobs } };
}

const JobListingsPage: FC<JobListingsPageProps> = async ({}) => {
  const { data } = await getDataJobs();

  return (
    <div>
      <div className="text-3xl font-semibold">Job Listings</div>

      <div className="mb-2 mt-5">
        Total Job Listings:{" "}
        <span className="font-semibold">{data?.total_data || 0}</span>
      </div>

      <JobListingsTable jobs={data.jobs} />
    </div>
  );
};

export default JobListingsPage;
