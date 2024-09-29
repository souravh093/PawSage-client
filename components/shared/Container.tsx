import React, { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`max-w-[1228px] ${className} mx-auto`}
    >
      {children}
    </div>
  );
};

export default Container;
