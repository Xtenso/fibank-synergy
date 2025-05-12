"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../lib/auth";
import { Form, Button, Input, addToast } from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { validateUsername, validatePassword } from "../../utils/validation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const { login, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Map backend errors to translation keys; fallback to loginError
  useEffect(() => {
    if (authError) {
      let errorKey = "loginError";

      if (authError.includes("Invalid credentials")) {
        errorKey = "invalidCredentials";
      }

      addToast({
        title: t("loginFailed"),
        description: t(errorKey),
        variant: "solid",
        color: "danger",
      });
    }
  }, [authError, t]);

  const handleValueChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateField = (field: string): string | null => {
    switch (field) {
      case "username":
        return validateUsername(formData.username, t);
      case "password":
        return validatePassword(formData.password, t);
      default:
        return null;
    }
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));

    const error = validateField(field);

    setValidationErrors((prev) => {
      if (error) {
        return {
          ...prev,
          [field]: error,
        };
      } else {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field] = error;
      }
    });

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(formData.username, formData.password);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        label={t("username")}
        type="text"
        id="username"
        isRequired
        value={formData.username}
        onValueChange={(value) => handleValueChange("username", value)}
        onBlur={() => handleBlur("username")}
        isInvalid={!!validationErrors.username}
        errorMessage={validationErrors.username}
      />

      <Input
        label={t("password")}
        type="password"
        id="password"
        isRequired
        value={formData.password}
        onValueChange={(value) => handleValueChange("password", value)}
        onBlur={() => handleBlur("password")}
        isInvalid={!!validationErrors.password}
        errorMessage={validationErrors.password}
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
