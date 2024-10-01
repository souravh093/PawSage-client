import React from "react";
import CreatePost from "./_components/CreatePost";
import PostCard from "@/components/card/PostCard";
import { TPost } from "@/types/post.interface";
import { getPosts } from "@/services/FetchPosts";
import { currentUser } from "@/services/AuthService";
import InfiniteScroll from "./_components/InfiniteScroll";

const Feed = async ({ searchParams }: { searchParams: any }) => {
  const searchQuery = searchParams.search || "";
  const categoryQuery = searchParams.category || "";

  const { data } = await getPosts({
    search: searchQuery,
    category: categoryQuery,
    page: 2,
    limit: 3,
  });
  console.log(data);
  const userData = await currentUser();
  return (
    <div>
      {userData?.email && <CreatePost />}
      <div className="my-5 flex flex-col gap-5">
        {data?.result?.map((post: TPost) => (
          <PostCard key={post._id} data={post} />
        ))}
      </div>
      {/* <InfiniteScroll
        searchQuery={searchQuery}
        categoryQuery={categoryQuery}
        initialPosts={data?.result || []}
      /> */}
    </div>
  );
};

export default Feed;
