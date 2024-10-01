"use client";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchFilter = () => {
  return (
    <div className="flex justify-between gap-5 my-5">
      <Input
        className="w-full"
        placeholder="Search for a tip or story"
        size="lg"
        startContent={<SearchIcon size={18} />}
        type="search"
      />

      <Select size="sm" label="Select Category" className="max-w-xs">
        <SelectItem key={"Tip"}>Tip</SelectItem>
        <SelectItem key={"Story"}>Story</SelectItem>
      </Select>
    </div>
  );
};

export default SearchFilter;
