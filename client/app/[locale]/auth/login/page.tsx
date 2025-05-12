"use client";

import { useTranslations } from "next-intl";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <>
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
    </>
  );
}
