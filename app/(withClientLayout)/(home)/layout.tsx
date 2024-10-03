// layout.tsx (Server Component)
import Container from "@/components/shared/Container";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import SearchFilter from "./@feed/_components/SearchFilter";
import { getPremiumPosts } from "@/services/FetchPosts";
import { currentUser } from "@/services/AuthService";
import { getUsers } from "@/services/User/indext";

const layout = async ({ feed }: { children: ReactNode; feed: ReactNode }) => {
  const { data: users } = await getUsers({ limit: 5 });
  const userData = await currentUser();
  const { data: premiumPosts } = await getPremiumPosts();

  return (
    <Container>
      <div className="grid grid-cols-3 gap-10 my-5">
        <main className="col-span-3 md:col-span-2">
          <SearchFilter />
          {feed}
        </main>
        <div className="hidden md:block col-span-1">
          <SidebarWrapper users={users} userData={userData} premiumPosts={premiumPosts.result} />
        </div>
      </div>
    </Container>
  );
};

const SidebarWrapper = ({ users, userData, premiumPosts }: any) => {
  return (
    <div className="sticky top-20 scroll-my-1">
      <Sidebar users={users} userData={userData} premiumPosts={premiumPosts} />
    </div>
  );
};

export default layout;
