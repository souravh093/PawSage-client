import React from "react";
import CardSkeleton from "./_components/CardSkeleton";
import { Skeleton } from "@nextui-org/skeleton";
const loading = () => {
  return (
    <>
      <div className="max-w-[300px] w-full mb-5 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {[...Array(4)].map((_idx, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};
export default loading;