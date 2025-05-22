import { Request, Response } from "express";
import Menu from "../models/Menu";
import RoleMenu from "../models/RoleMenu";
import Role from "../models/Role";
import { sendSuccess, sendError } from "../utils/responseUtils";

export const getMenus = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, "Authentication required", 401);
      return;
    }

    const userRole = req.user.role;

    let accessibleMenus;

    if (userRole === "admin") {
      accessibleMenus = await Menu.find({ isActive: true }).sort({ order: 1 });
    } else {
      const role = await Role.findOne({ code: userRole });

      if (!role) {
        sendError(res, "Role not found", 404);
        return;
      }

      const roleMenus = await RoleMenu.find({ roleId: role._id });
      const menuIds = roleMenus.map((rm) => rm.menuId);

      accessibleMenus = await Menu.find({
        _id: { $in: menuIds },
        isActive: true,
      }).sort({ order: 1 });
    }

    const menuMap = new Map<string, any>();
    accessibleMenus.forEach((menu) => {
      menuMap.set(String(menu._id), {
        _id: menu._id,
        key: menu.key,
        href: menu.href,
        icon: menu.icon,
        order: menu.order,
        children: [],
      });
    });

    const rootMenus: any[] = [];

    accessibleMenus.forEach((menu) => {
      if (!menu.parentId) {
        rootMenus.push(menuMap.get(String(menu._id)));
      } else if (menuMap.has(String(menu.parentId))) {
        const parentMenu = menuMap.get(String(menu.parentId));
        parentMenu.children.push(menuMap.get(String(menu._id)));
      }
    });

    sendSuccess(res, rootMenus, "Menus retrieved successfully");
  } catch (error) {
    sendError(res, "Failed to fetch menus", 500, error);
  }
};
