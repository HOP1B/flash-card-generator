"use client";

import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex">
      <House />
      <p>Title</p>
      <div>
        <Button>Unit Guides</Button>
        <Button> Questions</Button>
        <Button></Button>
      </div>
    </div>
  );
};
