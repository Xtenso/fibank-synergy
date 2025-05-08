"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { addToast } from "@heroui/react";
import { useAuth } from "../../lib/auth";
import Navbar from "../../components/layout/Navbar";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tReg = useTranslations("register");
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
      <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="w-full sm:max-w-3xl">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {tReg("title")}
          </h2>
          <p>{tReg("description")}</p>
        </div>

        <div className="mt-8 w-full sm:max-w-3xl">
          <div className="py-8 px-4 bg-[var(--secondary-background)] sm:rounded-lg sm:px-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
