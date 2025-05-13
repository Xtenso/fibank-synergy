"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import Icons from "../../components/icons";

const links = [
  { key: "home", href: "/dashboard", icon: "Pie" },
  { key: "reports", href: "/dashboard/reports", icon: "Stack" },
  { key: "payments", href: "/dashboard/payments", icon: "Payment" },
  { key: "statements", href: "/dashboard/statements", icon: "Withdraw" },
  { key: "accounts", href: "/dashboard/accounts", icon: "List" },
  { key: "deposits", href: "/dashboard/deposits", icon: "Deposit" },
  { key: "cards", href: "/dashboard/cards", icon: "Card" },
  { key: "signTransfers", href: "/dashboard/sign-transfers", icon: "Pen" },
  { key: "documents", href: "/dashboard/documents", icon: "DocumentsSign" },
  { key: "services", href: "/dashboard/services", icon: "Letter" },
  { key: "utilities", href: "/dashboard/utilities", icon: "Book" },
  { key: "declarations", href: "/dashboard/declarations", icon: "Documents" },
];

export default function NavLinks() {
  const tNav = useTranslations("navigation");
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const IconComponent = Icons[link.icon];

        return (
          <Link
            key={link.key}
            href={link.href}
            className={`flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium 
              ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]"
              } transition-colors duration-150`}
          >
            <IconComponent className="w-5 h-5" />
            <span>{tNav(link.key)}</span>
          </Link>
        );
      })}
    </div>
  );
}
