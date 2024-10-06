"use client";

import React from "react";

import {
  HomeIcon,
  UsersIcon,
  MenuIcon,
  XIcon,
  TableOfContents,
  CreditCard,
  FileText,
} from "lucide-react";
import { Link } from "@nextui-org/link";
import { Card } from "@nextui-org/card";
import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon size={20} />, href: "/client" },
    {
      name: "My Posts",
      icon: <TableOfContents size={20} />,
      href: "/client/posts",
    },
    {
      name: "Followed Users",
      icon: <UsersIcon size={20} />,
      href: "/client/followed",
    },
    {
      name: "Followers",
      icon: <CreditCard size={20} />,
      href: "/client/followers",
    },
    {
      name: "Generate PDF",
      icon: <FileText size={20} />,
      href: "/client/pdf",
    },
  ];

  const SidebarContent = () => (
    <div className="sticky top-8">
      <nav>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-2 p-4 hover:bg-gray-100 transition-colors"
            onClick={closeSidebar}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Card className="hidden lg:flex flex-col w-64 h-full rounded-none ">
        <SidebarContent />
      </Card>

      <div className="flex flex-col flex-grow">
        <Navbar isBordered className="lg:hidden">
          <NavbarContent>
            <Button
              onPress={toggleSidebar}
              isIconOnly
              aria-label="Toggle Menu"
              variant="light"
            >
              {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </Button>
          </NavbarContent>
        </Navbar>

        <Card
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <Button
              onPress={closeSidebar}
              isIconOnly
              aria-label="Close Menu"
              variant="light"
            >
              <XIcon size={24} />
            </Button>
          </div>
          <SidebarContent />
        </Card>

        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar}
          />
        )}

        <main className="flex-grow p-6 overflow-auto bg-white dark:bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
