"use client";

import { useTranslations } from "next-intl";
import LoginForm from "../../components/auth/LoginForm";
import { Divider } from "@heroui/react";

export default function LoginPage() {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col sm:flex-row gap-20">
      <div className="h-fit w-full sm:max-w-md border-1 border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t("loginTitle")}
        </h2>

        <div>
          <LoginForm />
        </div>
      </div>

      <div className="w-full sm:max-w-xl flex flex-col gap-6">
        <div className="p-2">
          <h3 className="text-xl font-bold mb-2">
            {t("importantNoticeTitle")}
          </h3>
          <p className="text-gray-700 mb-4">{t("importantNoticeDesc")}</p>
          <a href="#" className="font-medium inline-flex items-center">
            {t("readMore")} &raquo;
          </a>
        </div>

        <Divider />

        <div className="p-2">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("demoTitle")}
          </h3>
          <p className="text-gray-700 mb-4">{t("demoDesc")}</p>
          <a
            href="#"
            className="text-primary font-medium inline-flex items-center"
          >
            {t("demoLink")} &raquo;
          </a>
        </div>

        <Divider />

        <div className="p-2">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t("tokenBankingTitle")}
          </h3>
          <p className="text-gray-700 mb-4">{t("tokenBankingDesc")}</p>
          <a href="#" className="font-medium inline-flex items-center">
            {t("learnMore")} &raquo;
          </a>
        </div>
      </div>
    </div>
  );
}
