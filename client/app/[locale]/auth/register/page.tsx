import { useTranslations } from "next-intl";
import Navbar from "../../components/layout/Navbar";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("register");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="w-full sm:max-w-3xl">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t("title")}
          </h2>
          <p>{t("description")}</p>
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
