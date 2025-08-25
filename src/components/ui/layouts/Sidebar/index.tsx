"use client";

import React, { FC } from "react";
import { Button } from "../../button";
import {
  AiOutlineCalendar,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { BsBuildings, BsGear } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Main menu
  const mainMenu = [
    { label: "Home", icon: AiOutlineHome, path: "/" },
    { label: "Messages", icon: AiOutlineMessage },
    { label: "Company Profile", icon: BsBuildings, path: "/company-profile" },
    { label: "All Applicants", icon: AiOutlineUsergroupAdd },
    {
      label: "Job Listings",
      icon: HiOutlineClipboardDocumentList,
      path: "/job-listings",
    },
    { label: "My Schedule", icon: AiOutlineCalendar },
  ];

  // Menu settings
  const settingsMenu = [
    { label: "Settings", icon: BsGear, path: "/settings" },
    {
      label: "Log out",
      icon: AiOutlineLogout,
      action: () => signOut(),
      isLogout: true,
    },
  ];

  return (
    <div
      className={`fixed min-h-screen border-r pb-12 ${isOpen ? "w-[280px]" : "w-[80px]"} `}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center justify-between">
            {isOpen && (
              <h2 className="px-4 text-lg font-semibold">Dashboard</h2>
            )}

            {isOpen ? (
              <button onClick={() => setIsOpen(!isOpen)}>
                <FaArrowLeftLong className="cursor-pointer" />
              </button>
            ) : (
              <button
                className="mx-auto mb-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaArrowRight className="cursor-pointer" />
              </button>
            )}
          </div>

          {/* Main Menu */}
          <div className="space-y-3">
            {mainMenu.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start rounded-none hover:text-blue-500 ${pathname === item.path && "bg-accent"}`}
                onClick={() => item.path && router.push(item.path)}
              >
                <item.icon className={`${isOpen && "mr-2"} text-lg`} />
                {isOpen && item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {isOpen && (
            <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          )}

          {settingsMenu.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start rounded-none hover:text-blue-500 ${pathname === item.path && "bg-accent"} ${item.isLogout && "text-destructive hover:bg-red-200 hover:text-destructive"}`}
              onClick={() =>
                item.action
                  ? item.action()
                  : item.path && router.push(item.path)
              }
            >
              <item.icon className={`${isOpen && "mr-2"} text-lg`} />
              {isOpen && item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
