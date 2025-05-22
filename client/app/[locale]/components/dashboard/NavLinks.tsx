"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useMenus } from "../../lib/menuService";
import { Spinner } from "@heroui/react";
import { useState } from "react";
import MenuItem from "./MenuItem";

export default function NavLinks() {
  const tNav = useTranslations("navigation");
  const pathname = usePathname();
  const { menus, loading, error } = useMenus();

  const [activeMenuIds, setActiveMenuIds] = useState<string[]>([]);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500 p-2">Failed to load navigation</div>
    );
  }

  return (
    <div className="space-y-1">
      {menus.map((menu) => (
        <MenuItem
          key={menu._id}
          menu={menu}
          pathname={pathname}
          tNav={tNav}
          activeMenuIds={activeMenuIds}
          setActiveMenuIds={setActiveMenuIds}
        />
      ))}
    </div>
  );
}
