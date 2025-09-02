import moment from "moment";
import Link from "next/link";
import { FC } from "react";
import { BsPeople } from "react-icons/bs";
import { CiCalendar, CiGlobe } from "react-icons/ci";
import { IoCodeSlashSharp, IoLocationOutline } from "react-icons/io5";

interface CompanyOverviewProps {
  location: string;
  employee: string;
  dateFounded: Date;
  website: string;
  description: string;
  techStack: string[];
}

const CompanyOverview: FC<CompanyOverviewProps> = ({
  location,
  employee,
  dateFounded,
  website,
  description,
  techStack,
}) => {
  return (
    <>
      <div className="mb-10 grid space-y-4 sm:grid-cols-2 sm:space-y-0 lg:grid-cols-4 lg:space-y-0">
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <IoLocationOutline className="h-8 w-8" />
          <div className="ml-2">
            <p className="text-sm">Location</p>
            <p className="font-semibold">{location}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <BsPeople className="h-8 w-8" />
          <div className="ml-2">
            <p className="text-sm">Employee</p>
            <p className="font-semibold">{employee}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <CiCalendar className="h-8 w-8" />
          <div className="ml-2">
            <p className="text-sm">Date Founded</p>
            <p className="font-semibold">
              {moment(dateFounded).format("Do MMMM YYYY")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <CiGlobe className="h-8 w-8" />
          <div className="ml-2">
            <p className="text-sm">Website</p>
            <Link href={website} target="_blank" className="font-semibold">
              {website}
            </Link>
          </div>
        </div>
      </div>

      {/* About Us */}
      <h3 className="mb-2 text-lg font-semibold">About Us</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />

      {/* Tech Stack */}
      <div className="mt-10 flex items-center">
        <IoCodeSlashSharp className="h-8 w-8" />
        <h3 className="-mb-2 ml-2 text-lg font-semibold">Tech Stack</h3>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:flex sm:gap-0 sm:space-x-4">
        {techStack?.map((item: any, index: number) => (
          <span key={index} className="rounded border px-2 py-1 text-sm">
            {item}
          </span>
        ))}
      </div>
    </>
  );
};

export default CompanyOverview;
