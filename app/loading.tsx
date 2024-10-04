import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-opacity-30 bg-white backdrop-blur-lg rounded-lg shadow-lg">
      <Spinner size="lg" />
      <span className="ml-4 text-xl font-semibold text-gray-700">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
