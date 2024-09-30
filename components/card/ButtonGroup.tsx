import React from "react";
import { Button } from "@nextui-org/button";
import { ArrowDown, ArrowUp, Share } from "lucide-react";

const ButtonGroup = () => {
  return (
    <div className="flex my-2">
      <Button startContent={<ArrowUp />} variant="light" className="w-1/3">Up Vote</Button>
      <Button startContent={<ArrowDown />} variant="light" className="w-1/3">Down Vote</Button>
      <Button startContent={<Share />} variant="light" className="w-1/3">Share</Button>
    </div>
  );
};

export default ButtonGroup;
