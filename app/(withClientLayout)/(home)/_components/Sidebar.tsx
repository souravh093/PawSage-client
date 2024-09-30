import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div className="lg:w-1/3 space-y-6">
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
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
