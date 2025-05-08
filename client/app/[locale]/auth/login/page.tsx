"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { addToast } from "@heroui/react";
import { useAuth } from "../../lib/auth";
import Navbar from "../../components/layout/Navbar";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
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
          color: "primary",
        });
      }

      router.push("/dashboard");
    }
  }, [isAuthenticated, router, t, justLoggedIn]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("loginTitle")}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[var(--secondary-background)] py-8 px-4 sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
