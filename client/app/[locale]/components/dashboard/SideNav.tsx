"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import NavLinks from "./NavLinks";
import { Button, User, Divider } from "@heroui/react";
import { useAuth } from "../../lib/auth";
import { getInitials } from "../../utils/getInitials";
import Icons from "@/app/[locale]/components/icons";

export default function SideNav() {
  const t = useTranslations("auth");
  const tNav = useTranslations("navigation");
  const locale = useLocale();
  const { user, logout } = useAuth();

  const displayName = locale === "bg" ? user?.nameCyrillic : user?.nameLatin;

  // Fibank info links
  const infoLinks = [
    { key: "branches", href: "#" },
    { key: "atms", href: "#" },
    { key: "exchangeRates", href: "#" },
    { key: "news", href: "#" },
    { key: "promotions", href: "#" },
  ];

  // Additional links
  const additionalLinks = [
    { key: "help", href: "#" },
    { key: "toWebsite", href: "#" },
    { key: "mobileApp", href: "#" },
  ];

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <Link href="/dashboard" className="block">
          <User
            name={displayName || t("user")}
            description={user?.email || t("userAccount")}
            className="justify-start"
            avatarProps={{
              name: getInitials(displayName),
              color: "primary",
              size: "md",
              // src: user?.profilePhotoUrl,
            }}
          />
        </Link>

        <Button
          color="danger"
          className="w-full justify-start mt-3"
          onPress={() => {}}
          startContent={<Icons.Transfer />}
        >
          {tNav("transfer")}
        </Button>
      </div>

      <div className="p-4">
        <NavLinks />

        <Divider className="my-4" />

        <div className="mt-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {tNav("fibankInfo")}
          </h3>

          <div className="mt-2 space-y-1">
            {infoLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-[var(--primary)] transition-colors"
              >
                {tNav(link.key)}
              </Link>
            ))}
          </div>
        </div>

        <Divider className="my-4" />

        <div className="mt-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {tNav("additional")}
          </h3>

          <div className="mt-2 space-y-1">
            {additionalLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-[var(--primary)] transition-colors"
              >
                {tNav(link.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-gray-200">
        <Button
          color="danger"
          variant="flat"
          className="w-full justify-start"
          onPress={logout}
          startContent={<Icons.Logout />}
        >
          {t("signOut")}
        </Button>
      </div>
    </div>
  );
}
