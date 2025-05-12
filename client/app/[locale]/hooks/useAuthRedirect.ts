"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { addToast } from "@heroui/react";
import { useAuth } from "../lib/auth";

export function useAuthRedirect() {
  const t = useTranslations("auth");
  const { isAuthenticated, justLoggedIn } = useAuth();
  const router = useRouter();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !redirectedRef.current) {
      redirectedRef.current = true;

      if (!justLoggedIn) {
        addToast({
          title: t("alreadyLoggedIn"),
          description: t("redirectingToDashboard"),
          variant: "solid",
          color: "warning",
        });
      }

      router.push("/dashboard");
    }
  }, [isAuthenticated, router, t, justLoggedIn]);

  return { isAuthenticated };
}
