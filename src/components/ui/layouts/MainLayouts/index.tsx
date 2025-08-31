"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";
import { Header } from "../Header";

const MainLayouts = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-t">
      <div className="bg-background">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Overlay Main Content */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="col-span-3 ml-[80px] min-h-screen lg:col-span-5">
          <div className="px-6 py-6 lg:px-8">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayouts;
