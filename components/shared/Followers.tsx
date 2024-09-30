import { Button } from "@nextui-org/button";
import { UserPlus } from "lucide-react";
import React from "react";

const Followers = () => {
  return (
    <Button
      className={"bg-primary text-white border-default-200"}
      color="primary"
      radius="full"
      size="sm"
      variant={"bordered"}
      endContent={<UserPlus size={16} />}
    >
      {"Follow"}
    </Button>
  );
};

export default Followers;
