"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Header } from "../Header";

const MainLayouts = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [isVisibleElement, setIsVisibleElement] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSidebarVisible(false);
        setIsVisibleElement(false);
      } else {
        setIsSidebarVisible(true);
        setIsVisibleElement(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="border-t">
      <div className="bg-background">
        {/* Sidebar */}
        {isSidebarVisible && (
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
          />
        )}

        {/* Overlay Main Content */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => {
              setIsOpen(false);

              // If screen width < 640 then don't render sidebar
              if (window.innerWidth < 640) setIsSidebarVisible(false);
            }}
          />
        )}

        {/* Main Content */}
        <div className="col-span-3 min-h-screen sm:ml-[80px] lg:col-span-5">
          <div className="px-6 py-6 lg:px-8">
            <Header
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isSidebarVisible={isSidebarVisible}
              setIsSidebarVisible={setIsSidebarVisible}
              isVisibleElement={isVisibleElement}
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayouts;
