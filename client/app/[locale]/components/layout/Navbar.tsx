"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useAuth } from "../../lib/auth";
import { Link } from "@/i18n/navigation";
import { Button, Avatar } from "@heroui/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { getInitials } from "../../utils/getInitials";

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const t = useTranslations("auth");
  const tNav = useTranslations("navigation");

  const displayName = locale === "bg" ? user?.nameCyrillic : user?.nameLatin;
  const logoDestination = isAuthenticated ? "/dashboard" : "/";

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link className="flex flex-row items-center" href={logoDestination}>
              <Image
                src="/logo.png"
                alt="FiBank Synergy Logo"
                width={167}
                height={40}
                className="scale-[0.9]"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex md:flex-1 md:justify-center">
            {!isAuthenticated && (
              <div className="flex space-x-8">
                <Link
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {tNav("toWebsite")}
                </Link>
                <Link
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {tNav("mobileApp")}
                </Link>
                <Link
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {tNav("termsChanges")}
                </Link>
                <Link
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {tNav("help")}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="flex items-center space-x-6 mr-4">
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  {tNav("messages")}
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  {tNav("notifications")}
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  {tNav("settings")}
                </Link>
              </div>
            )}

            <LanguageSwitcher />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Avatar
                  color="primary"
                  name={getInitials(displayName)}
                  size="sm"
                  className="hidden sm:flex"
                  // src={user?.profilePhotoUrl}
                />
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
