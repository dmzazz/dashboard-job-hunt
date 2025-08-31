import React, { FC } from "react";
import prisma from "../../../../../../lib/prisma";

type paramsType = { id: string };

interface JobListingsUpdatePageProps {
  params: paramsType;
}

async function updateDataJobs(id: string) {
  const job = await prisma.job.findFirst({
    where: {
      id: id,
    },
    select: {
      roles: true,
      datePosted: true,
    },
  });
}

const JobListingsUpdatePage: FC<JobListingsUpdatePageProps> = async ({
  params,
}) => {
  const job = await updateDataJobs(params.id);
  return <div>JobListingsUpdatePage</div>;
};

export default JobListingsUpdatePage;
