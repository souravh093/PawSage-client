"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { ImageIcon } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full space-y-6">
        {/* Random Users to Follow */}
        <Card>
          <CardHeader>
            <h1>Who to Follow</h1>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar src={`https://i.pravatar.cc/40?img=${i}`} />
                    <div>
                      <p className="font-medium">User {i + 1}</p>
                      <p className="text-sm text-gray-500">@user{i + 1}</p>
                    </div>
                  </div>
                  <Button variant="bordered" size="sm">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h1>Premium Posts</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                  <ImageIcon className="text-gray-400" size={24} />
                </div>
                <div>
                  <p className="font-medium">Premium Tip #{i + 1}</p>
                  <p className="text-sm text-gray-500">
                    Exclusive content for members
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
