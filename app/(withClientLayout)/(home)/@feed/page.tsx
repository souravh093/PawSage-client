import React from "react";
import CreatePost from "./_components/CreatePost";
import PostCard from "@/components/card/PostCard";
import { axiosInstance } from "@/lib/AxiosInstance";
import { TPost } from "@/types/post.interface";

const Feed = async () => {
  const { data } = await axiosInstance.get("/posts");
  console.log(data);
  return (
    <div>
      <CreatePost />
      <div className="my-5 flex flex-col gap-5">
        {data?.data.result?.map((post: TPost) => (
          <PostCard key={post._id} data={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
