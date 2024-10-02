import envConfig from "@/config/envConfig";
import { cookies, headers } from "next/headers";

export const getUsers = async () => {
  const fetchOptions = {
    next: {
      tags: ["users"],
    },
  };
  const queryParams = new URLSearchParams();

  queryParams.append("role", "user");
  queryParams.append("sort", "-createdAt");

  const res = await fetch(
    `${envConfig.baseApi}/users/all?limit=${5}`,
    fetchOptions
  );

  return res.json();
};

export const getUserData = async () => {
  const token = cookies().get("accessToken")?.value;
  console.log(token);
  const fetchOptions: Record<string, unknown> = {
    next: {
      tags: ["userData"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`${envConfig.baseApi}/users/me`, fetchOptions);

  return res.json();
};
