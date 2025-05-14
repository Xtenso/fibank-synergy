"use client";

import { useTranslations } from "next-intl";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tReg = useTranslations("register");

  return (
    <div className="w-full p-8 sm:max-w-3xl border-1 border-gray-200 rounded-lg">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">
          {tReg("title")}
        </h2>
        <p>{tReg("description")}</p>
      </div>

      <div className="mt-6">
        <RegisterForm />
      </div>
    </div>
  );
}
