import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";

const Logo = () => {
  return <Image src={logo} alt="logo" width={40} height={40} />;
};

export default Logo;
