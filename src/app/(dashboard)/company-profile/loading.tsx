import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";
import { BsBuildings, BsPeople } from "react-icons/bs";
import { CiCalendar, CiGlobe } from "react-icons/ci";
import { IoCodeSlashSharp, IoLocationOutline } from "react-icons/io5";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <>
      <div className="flex items-center">
        <Skeleton className="h-[150px] w-[150px] rounded-full" />

        {/* Company Name */}
        <div className="ml-5 flex-grow">
          <div className="flex items-center">
            <Skeleton className="h-14 w-14" />
            <Skeleton className="ml-2 h-14 w-36" />
          </div>
          <Skeleton className="mt-2 h-10 w-52" />
        </div>
      </div>

      {/* Company Detail */}
      <div className="mb-4 mt-10">
        <Skeleton className="h-10 w-64" />
      </div>

      {/* List Detail Company */}
      <div className="rounded-lg border px-4 py-6">
        <div className="mb-10 flex items-center">
          <BsBuildings className="h-8 w-8" />
          <div className="-mb-2 ml-2 text-lg font-semibold">
            Company Overview
          </div>
        </div>

        <div className="mb-10 grid space-y-4 sm:grid-cols-2 sm:space-y-0 lg:grid-cols-4 lg:space-y-0">
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <IoLocationOutline className="h-8 w-8" />
            <div className="ml-2">
              <p className="text-sm">Location</p>
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <BsPeople className="h-8 w-8" />
            <div className="ml-2">
              <p className="text-sm">Employee</p>
              <Skeleton className="h-6 w-10" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <CiCalendar className="h-8 w-8" />
            <div className="ml-2">
              <p className="text-sm">Date Founded</p>
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <CiGlobe className="h-8 w-8" />
            <div className="ml-2">
              <p className="text-sm">Website</p>
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>

        {/* About Us */}
        <h3 className="mb-2 text-lg font-semibold">About Us</h3>
        <div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="mt-2 h-6 w-full" />
          <Skeleton className="mt-2 h-6 w-full" />
          <Skeleton className="mt-2 h-6 w-full" />
          <Skeleton className="mt-2 h-6 w-full" />
          <Skeleton className="mt-2 h-6 w-full" />
        </div>

        {/* Tech Stack */}
        <div className="mt-10 flex items-center">
          <IoCodeSlashSharp className="h-8 w-8" />
          <h3 className="-mb-2 ml-2 text-lg font-semibold">Tech Stack</h3>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:flex sm:gap-0 sm:space-x-4">
          <Skeleton className="rounded h-5 w-14" />
          <Skeleton className="rounded h-5 w-14" />
          <Skeleton className="rounded h-5 w-14" />
          <Skeleton className="rounded h-5 w-14" />
        </div>
      </div>
    </>
  );
};

export default loading;
