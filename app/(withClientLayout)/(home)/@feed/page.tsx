import React from "react";
import CreatePost from "./_components/CreatePost";
import PostCard from "@/components/card/PostCard";
import { TPost } from "@/types/post.interface";
import { getPosts } from "@/services/FetchPosts";
import { currentUser } from "@/services/AuthService";
import { axiosInstance } from "@/lib/AxiosInstance";
import { TPostComment } from "@/types/comment.interface";
import { getUserData } from "@/services/User/indext";

const Feed = async ({ searchParams }: { searchParams: any }) => {
  const searchQuery = searchParams.search || "";
  const categoryQuery = searchParams.category || "";

  const { data } = await getPosts({
    search: searchQuery,
    category: categoryQuery,
    page: 1,
    limit: 10,
  });

  const userData = await currentUser();

  const CreatePostElement = userData?.email ? await CreatePost() : null;
  const currentUserData = await getUserData();

  return (
    <div>
      {CreatePostElement}
      <div className="my-5 flex flex-col gap-5">
        {data?.result?.map(async (post: TPost) => {
          const commentsResponse = await axiosInstance.get(
            `/comments/${post._id}`
          );
          const comments: TPostComment[] = commentsResponse.data.data;

          return (
            <PostCard
              key={post._id}
              data={post}
              comments={comments}
              userData={userData}
              premium={currentUserData?.data?.premiumMember}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
