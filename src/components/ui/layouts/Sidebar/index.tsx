"use client";

import React, { FC } from "react";
import { Button } from "../../button";
import { AiOutlineCalendar, AiOutlineHome, AiOutlineLogout, AiOutlineMessage, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsBuildings, BsGear } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button variant={"ghost"} className="w-full justify-start rounded-none hover:text-blue-500" onClick={() => router.push("/")}>
              <AiOutlineHome className="mr-2 text-lg" />
              Home
            </Button>
            <Button variant={"ghost"} className="w-full justify-start rounded-none hover:text-blue-500">
              <AiOutlineMessage className="mr-2 text-lg" />
              Messages
            </Button>
            <Button variant={"ghost"} className="w-full justify-start rounded-none hover:text-blue-500">
              <BsBuildings className="mr-2 text-lg" />
              Company Profile
            </Button>
            <Button variant={"ghost"} className="w-full justify-start rounded-none hover:text-blue-500">
              <AiOutlineUsergroupAdd className="mr-2 text-lg" />
              All Aplicants
            </Button>
            <Button variant={"ghost"} className="w-full justify-start rounded-none hover:text-blue-500" onClick={() => router.push("/job-listings")}>
              <HiOutlineClipboardDocumentList className="mr-2 text-lg" />
              Job Listings
            </Button>
            <Button variant={"ghost"} className="w-full justify-start rounded-none hover:text-blue-500">
              <AiOutlineCalendar className="mr-2 text-lg" />
              My Schedule
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <Button variant={"ghost"} className="w-full justify-start rounded-none hover:text-blue-500" onClick={() => router.push("/settings")}>
            <BsGear className="mr-2 text-lg" />
            Settings
          </Button>
          <Button variant={"ghost"} className="w-full justify-start rounded-none text-destructive hover:text-destructive hover:bg-red-200" onClick={() => signOut()}>
            <AiOutlineLogout className="mr-2 text-lg" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
