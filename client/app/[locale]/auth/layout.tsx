"use client";

import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { useTranslations } from "next-intl";
import { Spinner } from "@heroui/react";
import { useAuth } from "../lib/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations("auth");

  useAuthRedirect();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
        <span className="ml-2">{t("redirectingLoader")}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
