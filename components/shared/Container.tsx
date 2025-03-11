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
      className={`max-w-[1440px] ${className} mx-auto`}
    >
      {children}
    </div>
  );
};

export default Container;
