"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

interface CompanyDialogEmptyDataProps {}

const CompanyDialogEmptyData: FC<CompanyDialogEmptyDataProps> = ({}) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Company Data Incomplete</DialogTitle>
        </DialogHeader>
        <p>Please complete your company profile on the Settings page.</p>
        <Button className="mt-4" onClick={() => router.push("/settings")}>
          Go to Settings
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDialogEmptyData;
