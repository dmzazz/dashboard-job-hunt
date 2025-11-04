import { FC } from "react";

import JobListingsTable from "@/components/organisms/JobListings/Table";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";

interface JobListingsPageProps {
  searchParams?: {
    sortBy?: string;
    orderBy?: "asc" | "desc";
  };
}

export const revalidate = 0;

async function getDataJobs(sortBy: string, orderBy: "asc" | "desc" = "asc") {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const jobs = await prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
    orderBy: sortBy ? { [sortBy]: orderBy } : undefined,
  });

  const totalJobs = await prisma.job.count({
    where: {
      companyId: session?.user.id,
    },
  });

  return { data: { jobs, total_data: totalJobs } };
}

const JobListingsPage: FC<JobListingsPageProps> = async ({ searchParams }) => {
  const sortBy = searchParams?.sortBy || "";
  const orderBy = (searchParams?.orderBy as "asc" | "desc") || "asc";

  const { data } = await getDataJobs(sortBy, orderBy);

  return (
    <>
      <div className="text-3xl font-semibold">Job Listings</div>

      <div className="mb-2 mt-5">
        Total Job Listings:{" "}
        <span className="font-semibold">{data?.total_data || 0}</span>
      </div>

      <JobListingsTable jobs={data.jobs} sortBy={sortBy} orderBy={orderBy} />
    </>
  );
};

export default JobListingsPage;
