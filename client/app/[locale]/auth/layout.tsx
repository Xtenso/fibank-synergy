"use client";

import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthRedirect();

  if (isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
