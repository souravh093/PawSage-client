import Container from "@/components/shared/Container";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import SearchFilter from "./@feed/_components/SearchFilter";
import { getPremiumPosts } from "@/services/FetchPosts";
import { currentUser } from "@/services/AuthService";
import { getUserData, getUsers } from "@/services/User/indext";
import LeftSidebar from "./_components/LeftSidebar";

const layout = async ({ feed }: { children: ReactNode; feed: ReactNode }) => {
  const { data: users } = await getUsers({ limit: 5 });
  const userData = await currentUser();
  const { data: premiumPosts } = await getPremiumPosts();
  const loggedUser = await getUserData();
  const leftSidebar = await LeftSidebar(); 
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 gap-3 sm:gap-5 my-5">
        <div className="hidden sm:block sm:col-span-2">
          {leftSidebar}
        </div>
        <main className="col-span-1 sm:col-span-6 lg:col-span-7">
          <SearchFilter />
          {feed}
        </main>
        <div className="hidden lg:block lg:col-span-3">
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

export const SidebarWrapper = ({
  users,
  userData,
  premiumPosts,
  premium,
}: any) => {
  return (
    <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
      <Sidebar
        users={users}
        userData={userData}
        premium={premium}
        premiumPosts={premiumPosts}
      />
    </div>
  );
};

export default layout;
