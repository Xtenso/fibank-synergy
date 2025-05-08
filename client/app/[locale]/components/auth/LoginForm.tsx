"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../lib/auth";
import { Button } from "@heroui/button";
import Input from "../ui/Input";
import { Link } from "@/i18n/navigation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const { login, error: authError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username) newErrors.username = t("errors.usernameRequired");

    if (!password) newErrors.password = t("errors.passwordRequired");
    else if (password.length < 6)
      newErrors.password = t("errors.passwordLength");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(username, password);
    } catch (error) {
      // Error is handled in auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {authError && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700">
          {authError}
        </div>
      )}

      <Input
        label={t("username")}
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
      />

      <Input
        label={t("password")}
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/auth/register"
            className="font-medium text-[var(--primary)]"
          >
            {t("noAccount")}
          </Link>
        </div>
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {t("login")}
      </Button>
    </form>
  );
}
