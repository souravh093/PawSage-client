"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Logo from "@/components/shared/Logo";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center mb-8">
              <Logo />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6 uppercase">
              Welcome Back!
            </h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  label="Email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  required
                />
              </div>
              <Button
                className="w-full bg-primary hover:bg-primaryLight"
                type="submit"
              >
                Log in
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
