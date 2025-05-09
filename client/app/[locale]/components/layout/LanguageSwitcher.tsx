"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Select, SelectItem } from "@heroui/react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelectionChange = (key: string | number | null) => {
    if (key && typeof key === "string") {
      router.replace(pathname, { locale: key });
    }
  };

  return (
    <div className="flex items-center">
      <Select
        size="sm"
        labelPlacement="outside"
        selectedKeys={[locale]}
        onChange={(e) => handleSelectionChange(e.target.value)}
        className="min-w-0 w-[80px]"
        aria-label="Select language"
        radius="sm"
      >
        <SelectItem key="en">EN</SelectItem>
        <SelectItem key="bg">BG</SelectItem>
      </Select>
    </div>
  );
}
