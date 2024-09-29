import Container from "@/components/shared/Container";
import React, { ReactNode } from "react";

const layout = ({
  children,
  feedSidebar,
  feed,
}: {
  children: ReactNode;
  feedSidebar: ReactNode;
  feed: ReactNode;
}) => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-10 my-5">
        <main className="col-span-2 bg-gray-300">{feed}</main>
        <aside className="col-span-1 bg-gray-400">{feedSidebar}</aside>
      </div>
    </Container>
  );
};

export default layout;
