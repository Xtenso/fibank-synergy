"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Icons from "../../components/icons";

interface MenuItemProps {
  menu: {
    _id: string;
    key: string;
    href: string;
    icon: string;
    children?: Array<any>;
  };
  pathname: string;
  tNav: (key: string) => string;
  activeMenuIds: string[];
  setActiveMenuIds: (ids: string[]) => void;
  depth?: number;
}

export const MenuItem = ({
  menu,
  pathname,
  tNav,
  activeMenuIds,
  setActiveMenuIds,
  depth = 0,
}: MenuItemProps) => {
  const isActive = pathname === menu.href;
  const hasChildren = menu.children && menu.children.length > 0;
  const isOpen = activeMenuIds.includes(menu._id);
  const menuRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const IconComponent =
    menu.icon && Icons[menu.icon as keyof typeof Icons]
      ? Icons[menu.icon as keyof typeof Icons]
      : null;

  const handleMouseEnter = () => {
    if (hasChildren) {
      // For top-level items clear any unrelated active menus
      if (depth === 0) {
        const childIds = menu.children?.map((child) => child._id) || [];
        setActiveMenuIds([
          menu._id,
          ...childIds.filter((id) => activeMenuIds.includes(id)),
        ]);
      } else {
        setActiveMenuIds((prev) => [...prev, menu._id]);
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (hasChildren) {
      if (
        submenuRef.current &&
        e.relatedTarget &&
        !submenuRef.current.contains(e.relatedTarget as Node)
      ) {
        setActiveMenuIds(activeMenuIds.filter((id) => id !== menu._id));
      }
    }
  };

  // Global click handler to close menus when clicking elsewhere
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuIds((ids) => ids.filter((id) => id !== menu._id));
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [menu._id, setActiveMenuIds]);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={menu.href}
        className={`flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium 
          justify-between whitespace-nowrap
          ${
            isActive
              ? "bg-[var(--primary)] text-white"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]"
          } transition-colors duration-150`}
      >
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="w-5 h-5" />}
          <span>{tNav(menu.key)}</span>
        </div>

        {hasChildren && (
          <Icons.ArrowRight
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "scale-125" : ""
            }`}
          />
        )}
      </Link>

      {hasChildren && (
        <div
          ref={submenuRef}
          className={`
            absolute top-0 left-[98%] pb-2 pl-3 pr-4 min-w-[220px] w-max z-[20] 
            transition-all duration-300 transform origin-top-left
            ${
              isOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }
          `}
        >
          <div className="bg-white rounded-md shadow-md">
            {menu.children?.map((child: any) => (
              <MenuItem
                key={child._id}
                menu={child}
                pathname={pathname}
                tNav={tNav}
                activeMenuIds={activeMenuIds}
                setActiveMenuIds={setActiveMenuIds}
                depth={depth + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
