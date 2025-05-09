import { useTranslations } from "next-intl";
import Navbar from "./components/layout/Navbar";
import SecurityIcon from "./components/icons/SecurityIcon";
import InterfaceIcon from "./components/icons/InterfaceIcon";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[var(--primary)] font-semibold tracking-wide uppercase">
              {t("companyName")}
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t("title")}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[var(--primary)] text-white">
                  <SecurityIcon />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {t("secureAuthentication")}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {t("secureDescription")}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[var(--primary)] text-white">
                  <InterfaceIcon />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {t("userFriendly")}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {t("userFriendlyDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">{t("footer")}</p>
        </div>
      </footer>
    </div>
  );
}
