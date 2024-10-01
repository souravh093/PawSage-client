import envConfig from "@/config/envConfig";

export const getPosts = async ({
  search = "",
  category = "",
  page = 1,
  limit = 10,
}: {
  search: string | undefined;
  category: string | undefined;
  page: number | undefined;
  limit: number | undefined;
}) => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };

  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append("searchTerm", search);
  }

  if (category) {
    queryParams.append("category", category);
  }

  queryParams.append("sort", "-likes");
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  const res = await fetch(
    `${envConfig.baseApi}/posts?${queryParams.toString()}`,
    fetchOptions
  );

  return res.json();
};


export const getPremiumPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };

  const queryParams = new URLSearchParams();
  queryParams.append("isPremium", "true");
  queryParams.append("sort", "-createdAt");
  queryParams.append("limit", "5");

  const res = await fetch(
    `${envConfig.baseApi}/posts?${queryParams.toString()}`,
    fetchOptions
  );

  return res.json();
}
