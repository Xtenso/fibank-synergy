"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../lib/auth";
import { Form, Button, Input, addToast } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { createValidator } from "../../utils/validation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const tUser = useTranslations("user");
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleValueChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateField = (fieldName: string) => {
    return createValidator(fieldName, formData, t, tUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await login(formData.username, formData.password);
    } catch (error: any) {
      let errorKey = "loginError";
      const errorMessage =
        error?.response?.data?.message || error?.message || "";

      if (errorMessage.includes("Invalid credentials")) {
        errorKey = "invalidCredentials";
      }

      addToast({
        title: t("loginFailed"),
        description: t(errorKey),
        variant: "solid",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        label={tUser("username")}
        type="text"
        id="username"
        isRequired
        value={formData.username}
        onValueChange={(value) => handleValueChange("username", value)}
        validate={validateField("username")}
        autoComplete="username"
      />

      <Input
        label={tUser("password")}
        type="password"
        id="password"
        isRequired
        value={formData.password}
        onValueChange={(value) => handleValueChange("password", value)}
        validate={validateField("password")}
        autoComplete="current-password"
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

      <Button type="submit" fullWidth isLoading={isSubmitting} color="primary">
        {t("login")}
      </Button>
    </Form>
  );
}
