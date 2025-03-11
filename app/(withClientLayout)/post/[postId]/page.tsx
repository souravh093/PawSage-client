import PostCard from "@/components/card/PostCard";
import Container from "@/components/shared/Container";
import envConfig from "@/config/envConfig";
import { axiosInstance } from "@/lib/AxiosInstance";
import { currentUser } from "@/services/AuthService";
import { getPremiumPosts } from "@/services/FetchPosts";
import { getUserData, getUsers } from "@/services/User/indext";
import React from "react";
import { SidebarWrapper } from "../../(home)/layout";

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

  const { data: users } = await getUsers({ limit: 5 });
  const { data: premiumPosts } = await getPremiumPosts();
  const loggedUser = await getUserData();

  return (
    <Container>
      <div className="grid grid-cols-12 gap-5 my-5">
        <div className="col-span-8">
          <PostCard
            key={params.postId}
            data={postData?.data?.data}
            userData={userData}
            details={true}
          />
        </div>
        
        <div className="col-span-4">
          <SidebarWrapper
            users={users}
            userData={userData}
            premiumPosts={premiumPosts.result}
            premium={loggedUser?.data?.premiumMember}
          />
        </div>
      </div>
    </Container>
  );
};

export default page;