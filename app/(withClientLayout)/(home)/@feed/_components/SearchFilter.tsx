"use client";

import useDebounce from "@/hooks/debounce.hook";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) {
      params.append("search", debouncedSearch);
    }

    if (category) {
      params.append("category", category);
    }

    router.push(`/?${params.toString()}`);
  }, [debouncedSearch, category, router]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex justify-between gap-5 my-5 sticky top-16 z-30 bg-gray-200 dark:bg-[#18181B] py-2 px-2 rounded-md">
      <Input
        className="w-full"
        placeholder="Search for a tip or story"
        size="lg"
        onChange={(e) => setSearch(e.target.value)}
        startContent={<SearchIcon size={18} />}
        type="search"
      />

      <Select
        onChange={handleSelectChange}
        size="sm"
        label="Select Category"
        className="max-w-xs"
      >
        <SelectItem key={"Tip"}>Tip</SelectItem>
        <SelectItem key={"Story"}>Story</SelectItem>
      </Select>
    </div>
  );
};

export default SearchFilter;
