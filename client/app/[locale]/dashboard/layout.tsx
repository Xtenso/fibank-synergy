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

  return (
    <div className="flex p-4 bg-gray-100">
      <div className="w-64 mr-4 hidden md:block">
        <SideNav />
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full min-h-[400px]">
            <Spinner size="lg" />
          </div>
        ) : (
          <main>{children}</main>
        )}
      </div>
    </div>
  );
}
