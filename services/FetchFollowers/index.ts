import envConfig from "@/config/envConfig";
import { cookies } from "next/headers";

export const getFollowers = async () => {
  const fetchOptions = {
    next: {
      tags: ["followers"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/followers/me}`,
    fetchOptions
  );

  return res.json();
};

export const getFollowedUsers = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const fetchOptions = {
    next: {
      tags: ["followedUsers"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await fetch(`${envConfig.baseApi}/followers/metoo}`, fetchOptions);

  return res.json();
};
