import { InstagramIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface CompanyTeamProps {
  key: string;
  name: string;
  position: string;
  instagram: string;
  linkedin: string;
}

const CompanyTeam: FC<CompanyTeamProps> = ({
  key,
  name,
  position,
  instagram,
  linkedin,
}) => {
  return (
    <div className="w-full">
      <div key={key} className="p-3 text-center shadow">
        <div className="mx-auto h-14 w-14 rounded-full bg-gray-300"></div>
        <div className="mt-4 font-semibold">{name}</div>
        <div className="text-sm uppercase text-gray-500">{position}</div>

        <div className="mx-auto mt-5 inline-flex gap-3 text-gray-500">
          <Link href={instagram}>
            <InstagramIcon className="h-4 w-4" />
          </Link>
          <Link href={linkedin}>
            <LinkedinIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyTeam;
