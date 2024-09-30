import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default function CardSkeleton() {
  return (
    <Card className="w-full">
      {/* Skeleton for Card Header */}
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          {/* Avatar Skeleton */}
          <Skeleton className="rounded-full">
            <div className="w-10 h-10 rounded-full"></div>
          </Skeleton>
          <Skeleton className="max-w-xl flex flex-col gap-2">
            <div className="w-96 rounded-md"></div>
            <div className="w-96 rounded-md"></div>
          </Skeleton>
        </div>
      </CardHeader>

      {/* Skeleton for Card Body */}
      <CardBody className="px-3 py-0 text-small text-default-400">
        {/* Thumbnail Image Skeleton */}
        <Skeleton className="w-full h-96 rounded-lg">
          <div className="h-96 w-full bg-default-300 rounded-xl"></div>
        </Skeleton>
        {/* Content Skeleton */}
        <div className="pt-2 space-y-2">
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-4 w-3/4 bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/4 rounded-lg">
            <div className="h-4 w-2/4 bg-default-200"></div>
          </Skeleton>
        </div>
      </CardBody>

      {/* Skeleton for Card Footer */}
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <Skeleton className="w-8 rounded-lg">
            <div className="h-3 w-8 bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-20 rounded-lg">
            <div className="h-3 w-20 bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="flex gap-1">
          <Skeleton className="w-8 rounded-lg">
            <div className="h-3 w-8 bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-20 rounded-lg">
            <div className="h-3 w-20 bg-default-200"></div>
          </Skeleton>
        </div>
      </CardFooter>
    </Card>
  );
}
