"use client";

import { useRequireAuth } from "../lib/auth";
import { Spinner } from "@heroui/react";
import SideNav from "../components/dashboard/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex p-4 bg-gray-100">
      <div className="w-64 mr-4 hidden md:block">
        <SideNav />
      </div>

      <div className="flex-1 overflow-auto">
        <main>{children}</main>
      </div>
    </div>
  );
}
