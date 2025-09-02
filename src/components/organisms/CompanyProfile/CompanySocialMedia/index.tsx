import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface CompanySocialMediaProps {
  instagram: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
}

const CompanySocialMedia: FC<CompanySocialMediaProps> = ({
  instagram,
  twitter,
  facebook,
  linkedin,
  youtube,
}) => {
  return (
    <div className="flex gap-4">
      <Link
        href={instagram}
        className="flex w-max items-center rounded-lg border px-4 py-2 transition-colors hover:cursor-pointer hover:bg-accent"
      >
        <InstagramIcon className="mr-2 h-6 w-6" />
        Instagram
      </Link>
      <Link
        href={twitter}
        className="flex w-max items-center rounded-lg border p-2 px-4 transition-colors hover:cursor-pointer hover:bg-accent"
      >
        <TwitterIcon className="mr-2 h-6 w-6" />
        Twitter
      </Link>
      <Link
        href={facebook}
        className="flex w-max items-center rounded-lg border p-2 px-4 transition-colors hover:cursor-pointer hover:bg-accent"
      >
        <FacebookIcon className="mr-2 h-6 w-6" />
        Facebook
      </Link>
      <Link
        href={linkedin}
        className="flex w-max items-center rounded-lg border p-2 px-4 transition-colors hover:cursor-pointer hover:bg-accent"
      >
        <LinkedinIcon className="mr-2 h-6 w-6" />
        LinkedIn
      </Link>
      <Link
        href={youtube}
        className="flex w-max items-center rounded-lg border p-2 px-4 transition-colors hover:cursor-pointer hover:bg-accent"
      >
        <YoutubeIcon className="mr-2 h-6 w-6" />
        Youtube
      </Link>
    </div>
  );
};

export default CompanySocialMedia;
