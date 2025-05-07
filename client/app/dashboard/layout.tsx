"use client";

import { useAuth, useRequireAuth } from "../lib/auth";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">
                  FiBank Synergy
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative flex items-center space-x-4">
                <p className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
