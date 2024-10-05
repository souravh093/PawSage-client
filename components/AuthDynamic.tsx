"use client";

import { NavbarItem } from "@nextui-org/navbar";
import React from "react";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useUser } from "@/context/user.provider";
import ProfileDropdown from "./ui/profileDropdown";

const AuthDynamic = () => {
  const { user } = useUser();
  return (
    <>
      {user?.email ? (
        <NavbarItem>
          <ProfileDropdown />
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className="hidden md:flex">
            <Button
              as={Link}
              className="text-sm font-normal border-none text-default-600 "
              href={"/login"}
              variant="ghost"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              as={Link}
              className="text-sm font-normal text-default-600 border-accent hover:bg-primaryLight"
              href={"/register"}
              variant="ghost"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
    </>
  );
};

export default AuthDynamic;
