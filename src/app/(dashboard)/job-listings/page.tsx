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
  });

  // sort data by "asc" or "desc"
  const handleSort = (jobA: any, jobB: any) => {
    const jobAValue = jobA[sortBy];
    const jobBValue = jobB[sortBy];

    // if value is undefined return 0
    if (jobAValue === undefined || jobBValue === undefined) return 0;

    // if data type is string
    if (typeof jobAValue === "string" && typeof jobBValue === "string") {
      return orderBy === "asc"
        ? jobAValue.localeCompare(jobBValue)
        : jobBValue.localeCompare(jobAValue);
    }

    // if data type is number
    if (typeof jobAValue === "number" && typeof jobBValue === "number") {
      return orderBy === "asc" ? jobAValue - jobBValue : jobBValue - jobAValue;
    }

    // if data type is date
    const isDateA = !isNaN(Date.parse(jobAValue));
    const isDateB = !isNaN(Date.parse(jobBValue));

    if (isDateA || isDateB) {
      const timeA = new Date(jobAValue).getTime();
      const timeB = new Date(jobBValue).getTime();
      return orderBy === "asc" ? timeA - timeB : timeB - timeA;
    }

    return 0;
  };

  const sorted = sortBy ? [...jobs].sort(handleSort) : jobs;

  const totalJobs = await prisma.job.count({
    where: {
      companyId: session?.user.id,
    },
  });

  return { data: { jobs: sorted, total_data: totalJobs } };
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
