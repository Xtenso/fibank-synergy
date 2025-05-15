"use client";

import { useAuth, useRequireAuth } from "../lib/auth";
import { Spinner } from "@heroui/react";
import SideNav from "../components/dashboard/SideNav";
import { useTranslations } from "next-intl";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations("auth");

  useRequireAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
        <span className="ml-2">{t("redirectingLoader")}</span>
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
