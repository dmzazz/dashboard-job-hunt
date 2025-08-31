"use client";

import { MAIN_MENU, SETTINGS_MENU } from "@/constant";
import { usePathname, useRouter } from "next/navigation";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { Button } from "../../button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarVisible: boolean;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  isSidebarVisible,
  setIsSidebarVisible,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`fixed z-50 min-h-screen border-r bg-white pb-12 transition-all ${isOpen ? "w-[280px]" : "w-[80px]"} `}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center justify-between">
            {isOpen && (
              <h2 className="px-4 text-lg font-semibold">Dashboard</h2>
            )}

            {isOpen ? (
              <button
                onClick={() => {
                  setIsOpen(!isOpen);

                  // If screen width < 640 then don't render sidebar
                  if (window.innerWidth < 640) setIsSidebarVisible(!isSidebarVisible);
                }}
              >
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
        </div>

        {/* Main Menu */}
        <div className="space-y-3">
          {MAIN_MENU.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start rounded-none hover:text-blue-500 ${isOpen && "pl-7"} ${pathname === item.path && "bg-gray-300"}`}
              onClick={() => item.path && router.push(item.path)}
            >
              <item.icon
                className={`${isOpen ? "mr-2" : "w-full text-center"} text-lg`}
              />
              {isOpen && item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {isOpen && (
            <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          )}

          {SETTINGS_MENU.map((item, index) => (
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
