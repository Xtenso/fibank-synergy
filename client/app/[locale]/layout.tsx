import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./lib/auth";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FiBank Synergy",
  description: "Banking synergy platform",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; 
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <HeroUIProvider>
          <ToastProvider />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>{children}</AuthProvider>
          </NextIntlClientProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
