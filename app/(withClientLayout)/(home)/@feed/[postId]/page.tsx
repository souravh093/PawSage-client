import PostCard from "@/components/card/PostCard";
import envConfig from "@/config/envConfig";
import { axiosInstance } from "@/lib/AxiosInstance";
import { currentUser } from "@/services/AuthService";
import { TPostComment } from "@/types/comment.interface";
import React from "react";

interface TPostId {
  params: {
    postId: string;
  };
}

const page = async ({ params }: TPostId) => {
  const userData = await currentUser();
  const postData = await axiosInstance.get(
    `${envConfig.baseApi}/posts/${params.postId}`
  );

  const commentsResponse = await axiosInstance.get(
    `/comments/${params.postId}`
  );
  const comments: TPostComment[] = commentsResponse.data.data;

  console.log(userData);

  return (
    <div>
      <PostCard
        key={params.postId}
        data={postData?.data?.data}
        comments={comments}
        userData={userData}
        details={true}
      />
      hello
    </div>
  );
};

export default page;
