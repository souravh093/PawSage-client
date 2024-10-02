import { axiosInstance } from "@/lib/AxiosInstance";
import React from "react";

const page = async () => {
  const { data: userData } = await axiosInstance.get("/users/me");
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-black">Wellcome {userData?.data?.name}</h1>
    </div>
  );
};

export default page;
