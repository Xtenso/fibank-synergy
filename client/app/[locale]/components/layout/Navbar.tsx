"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl"; // Add useLocale import
import { usePathname } from "@/i18n/navigation";
import { useAuth } from "../../lib/auth";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const locale = useLocale(); // Get current locale
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const t = useTranslations("auth");
  const tDash = useTranslations("dashboard");

  // Determine which name to display based on current language
  const displayName = locale === "bg" ? user?.nameCyrillic : user?.nameLatin;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link className="flex flex-row items-center" href="/">
              <Image
                src="/images/logo.png"
                alt="FiBank Synergy Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <h1 className="text-xl font-bold text-[var(--primary)] cursor-pointer">
                Synergy
              </h1>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`${
                  pathname === "/dashboard"
                    ? "border-[var(--primary)] text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {tDash("title")}
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 hidden sm:inline-block">
                  {displayName} {/* Use the dynamically determined name */}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 cursor-pointer text-sm rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                >
                  {t("signOut")}
                </button>
              </div>
            ) : (
              <>
                {pathname !== "/auth/login" && (
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {t("login")}
                  </Link>
                )}

                {pathname !== "/auth/register" && (
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {t("register")}
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
