import Container from "@/components/shared/Container";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";

const layout = ({
  children,
  feed,
}: {
  children: ReactNode;
  feed: ReactNode;
}) => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-10 my-5">
        <main className="col-span-2">{feed}</main>
        <div className="col-span-1 sticky top-0 bg-gray-400">
          <Sidebar />
        </div>
      </div>
    </Container>
  );
};

export default layout;
