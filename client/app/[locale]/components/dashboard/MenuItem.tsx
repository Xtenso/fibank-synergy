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
}

export const MenuItem = ({
  menu,
  pathname,
  tNav,
  activeMenuIds,
  setActiveMenuIds,
}: MenuItemProps) => {
  const isActive = pathname === menu.href;
  const hasChildren = menu.children && menu.children.length > 0;
  const isOpen = activeMenuIds.includes(menu._id);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const IconComponent =
    Icons[menu.icon as keyof typeof Icons] || Icons.Documents;

  const handleMouseEnter = (shouldOpen = true) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (shouldOpen && hasChildren && !isOpen) {
      setActiveMenuIds([...activeMenuIds, menu._id]);
    }
  };

  const handleMouseLeave = () => {
    if (hasChildren) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenuIds(activeMenuIds.filter((id) => id !== menu._id));
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={menu.href}
        className={`flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium 
          justify-between
          ${
            isActive
              ? "bg-[var(--primary)] text-white"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]"
          } transition-colors duration-150`}
      >
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5" />
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
          className={`
            absolute top-0 left-[98%] pb-2 pl-3 pr-2 min-w-[200px] 
            z-[20] transition-all duration-200
            ${
              isOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }
          `}
          onMouseEnter={() => handleMouseEnter(false)}
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
