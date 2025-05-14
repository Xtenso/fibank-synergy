"use client";

import { useTranslations } from "next-intl";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md border-1 border-gray-200 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {t("loginTitle")}
      </h2>

      <div>
        <LoginForm />
      </div>
    </div>
  );
}
