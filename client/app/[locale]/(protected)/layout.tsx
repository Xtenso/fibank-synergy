"use client";

import { useRequireAuth } from "../lib/auth";
import { Fragment } from "react";
import { Spinner } from "@heroui/react";

export default function ProtectedLayout({
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
    <Fragment>
      <div className="min-h-screen bg-gray-100">
        <main>{children}</main>
      </div>
    </Fragment>
  );
}
