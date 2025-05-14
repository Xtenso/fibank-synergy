"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  const links = [
    { key: "addAccount", href: "#" },
    { key: "sso", href: "#" },
    { key: "registration", href: "#" },
    { key: "signature", href: "#" },
    { key: "fees", href: "#" },
    { key: "documents", href: "#" },
  ];

  return (
    <footer className="bg-gray-100 w-full">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center flex-wrap text-xs text-gray-600">
          {links.map((link, index) => (
            <React.Fragment key={link.key}>
              {index > 0 && (
                <div
                  className="h-4 border-l border-gray-400 mx-2"
                  aria-hidden="true"
                />
              )}
              <Link href={link.href} className="hover:text-gray-900">
                {t(link.key)} &gt;
              </Link>
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-4 text-xs text-gray-500">
          <span className="inline-block">{t("copyright")} 2009-2025</span>
        </div>
      </div>
    </footer>
  );
}
