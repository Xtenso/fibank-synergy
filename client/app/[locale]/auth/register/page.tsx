"use client";

import { useTranslations } from "next-intl";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const tReg = useTranslations("register");

  return (
    <>
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
    </>
  );
}
