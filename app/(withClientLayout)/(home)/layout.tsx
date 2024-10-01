import Container from "@/components/shared/Container";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";

const layout = ({
  children,
  searchFilter,
  feed,
}: {
  children: ReactNode;
  feed: ReactNode;
  searchFilter: ReactNode;
}) => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-10 my-5">
        <main className="col-span-2">
          {searchFilter}
          {feed}
          </main>
        <div className="col-span-1">
          <SidebarWrapper />
        </div>
      </div>
    </Container>
  );
};

const SidebarWrapper = () => {
  return (
    <div className="sticky top-20">
      <Sidebar />
    </div>
  );
};

export default layout;
