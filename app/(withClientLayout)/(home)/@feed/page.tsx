import React from "react";
import CreatePost from "./_components/CreatePost";
import PostCard from "@/components/card/PostCard";
import { axiosInstance } from "@/lib/AxiosInstance";
import { TPost } from "@/types/post.interface";
import { getPosts } from "@/services/FetchPosts";
import { currentUser } from "@/services/AuthService";

const Feed = async () => {
  const { data } = await getPosts();
  const userData = await currentUser();
  return (
    <div>
      {userData?.email && <CreatePost />}
      <div className="my-5 flex flex-col gap-5">
        {data?.result?.map((post: TPost) => (
          <PostCard key={post._id} data={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
