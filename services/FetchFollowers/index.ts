import envConfig from "@/config/envConfig";

export const getFollowers = async () => {
  const fetchOptions = {
    next: {
      tags: ["followers"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/followers/metoo}`,
    fetchOptions
  );

  return res.json();
};

export const getFollowedUsers = async () => {
  const fetchOptions = {
    next: {
      tags: ["followedUsers"],
    },
  };

  const res = await fetch(`${envConfig.baseApi}/followers/mee}`, fetchOptions);

  return res.json();
};
