"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";
import { Header } from "../Header";

const MainLayouts = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);


  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="flex flex-row">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div
            className={`col-span-3 min-h-screen overflow-auto lg:col-span-5 ${isOpen ? "ml-[280px] flex-grow" : "ml-[80px] flex-grow"} transition-all`}
          >
            <div className="px-6 py-6 lg:px-8">
              <Header />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayouts;
