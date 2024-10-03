import Container from "@/components/shared/Container";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import SearchFilter from "./@feed/_components/SearchFilter";

const layout = ({
  feed,
}: {
  children: ReactNode;
  feed: ReactNode;
}) => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-10 my-5">
        <main className="col-span-3 md:col-span-2">
          <SearchFilter />
          {feed}
          </main>
        <div className="hidden md:block col-span-1">
          <SidebarWrapper />
        </div>
      </div>
    </Container>
  );
};

const SidebarWrapper = () => {
  return (
    <div className="sticky top-20 scroll-my-1">
      <Sidebar />
    </div>
  );
};

export default layout;
