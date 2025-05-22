"use client";

import { useState, useEffect } from "react";
import api from "./api";

export interface MenuItem {
  _id: string;
  key: string;
  href: string;
  icon: string;
  order: number;
  children: MenuItem[];
}

export function useMenus() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const response = await api.get("/menus");
        setMenus(response.data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch menus");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return { menus, loading, error };
}
