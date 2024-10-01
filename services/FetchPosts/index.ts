import envConfig from "@/config/envConfig";

export const getPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };
  
  const res = await fetch(`${envConfig.baseApi}/posts`, fetchOptions);

  return res.json();
};
