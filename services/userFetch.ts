import envConfig from "@/config/envConfig";

export const getUsersAll = async ({
  limit = 10,
  page = 1,
  role,
}: {
  limit?: number | undefined;
  page?: number | undefined;
  role?: string | undefined;
}) => {
  const fetchOptions = {
    next: {
      tags: ["users"],
    },
  };

  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append("limit", limit.toString());
  }
  if (page) {
    queryParams.append("page", page.toString());
  }

  if (role) {
    queryParams.append("role", role);
  }

  queryParams.append("sort", "-createdAt");
  queryParams.append("isDeleted", "false");

  const res = await fetch(
    `${envConfig.baseApi}/users/all?${queryParams.toString()}`,
    fetchOptions
  );

  return res.json();
};

