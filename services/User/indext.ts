import envConfig from "@/config/envConfig";

export const getUsers = async () => {
  const fetchOptions = {
    next: {
      tags: ["users"],
    },
  };
  const queryParams = new URLSearchParams();

  queryParams.append("role", "user");
  queryParams.append("sort", "-createdAt");

  const res = await fetch(`${envConfig.baseApi}/users/all?limit=${5}`, fetchOptions);

  return res.json();
};
