"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useAuth } from "../../lib/auth";
import { Link } from "@/i18n/navigation";
import { Button } from "@heroui/react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const t = useTranslations("auth");
  const tDash = useTranslations("dashboard");

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
                  {displayName}
                </span>
                <Button
                  color="danger"
                  variant="flat"
                  size="sm"
                  onPress={logout}
                >
                  {t("signOut")}
                </Button>
              </div>
            ) : (
              <>
                {pathname !== "/auth/login" && (
                  <Button
                    as={Link}
                    href="/auth/login"
                    color="primary"
                    size="sm"
                  >
                    {t("login")}
                  </Button>
                )}

                {pathname !== "/auth/register" && (
                  <Button
                    as={Link}
                    href="/auth/register"
                    variant="bordered"
                    size="sm"
                  >
                    {t("register")}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
