"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../lib/auth";
import {
  Form,
  Input,
  Button,
  addToast,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { calculatePasswordStrength } from "../../utils/passwordStrength";
import { validateField } from "../../utils/validation";

export default function RegisterForm() {
  const t = useTranslations("auth");
  const tUser = useTranslations("user");
  const { register, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    uin: "",
    uinForeigner: "",
    nameCyrillic: "",
    nameLatin: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    label: string;
    color:
      | "default"
      | "danger"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | undefined;
  }>({
    score: 0,
    label: "",
    color: "default",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Map backend errors to translation keys; fallback to registerError
  useEffect(() => {
    if (authError) {
      let errorKey = "registerError";

      if (authError.includes("email already exists")) {
        errorKey = "emailExists";
      } else if (authError.includes("Username already taken")) {
        errorKey = "usernameExists";
      }

      addToast({
        title: t("registerFailed"),
        description: t(errorKey),
        variant: "solid",
        color: "danger",
      });
    }
  }, [authError, t]);

  // Calculate password strength whenever password changes
  useEffect(() => {
    if (formData.password) {
      const strength = calculatePasswordStrength(formData.password, (key) =>
        t(key)
      );
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({
        score: 0,
        label: "",
        color: "default",
      });
    }
  }, [formData.password, t]);

  const handleValueChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateFormField = (field: string): string | null => {
    return validateField(field, formData, t, tUser, true);
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));

    const error = validateFormField(field);

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
      const error = validateFormField(field);
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
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        label={tUser("uin")}
        labelPlacement="outside"
        id="uin"
        isRequired
        value={formData.uin}
        onValueChange={(value) => handleValueChange("uin", value)}
        onBlur={() => handleBlur("uin")}
        isInvalid={!!validationErrors.uin}
        errorMessage={validationErrors.uin}
      />

      <Input
        label={tUser("uinForeigner")}
        labelPlacement="outside"
        id="uinForeigner"
        value={formData.uinForeigner}
        onValueChange={(value) => handleValueChange("uinForeigner", value)}
        onBlur={() => handleBlur("uinForeigner")}
        isInvalid={!!validationErrors.uinForeigner}
        errorMessage={validationErrors.uinForeigner}
        endContent={
          <Popover placement="right">
            <PopoverTrigger>
              <Button isIconOnly size="sm" color="primary" radius="full">
                ?
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-tiny">
                  {tUser("uniForeignerPopoverMessage")}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        }
      />

      <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
        <Input
          label={tUser("nameCyrillic")}
          labelPlacement="outside"
          id="nameCyrillic"
          isRequired
          value={formData.nameCyrillic}
          onValueChange={(value) => handleValueChange("nameCyrillic", value)}
          onBlur={() => handleBlur("nameCyrillic")}
          isInvalid={!!validationErrors.nameCyrillic}
          errorMessage={validationErrors.nameCyrillic}
        />

        <Input
          label={tUser("nameLatin")}
          labelPlacement="outside"
          id="nameLatin"
          isRequired
          value={formData.nameLatin}
          onValueChange={(value) => handleValueChange("nameLatin", value)}
          onBlur={() => handleBlur("nameLatin")}
          isInvalid={!!validationErrors.nameLatin}
          errorMessage={validationErrors.nameLatin}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
        <Input
          label={tUser("email")}
          labelPlacement="outside"
          type="email"
          id="email"
          isRequired
          value={formData.email}
          onValueChange={(value) => handleValueChange("email", value)}
          onBlur={() => handleBlur("email")}
          isInvalid={!!validationErrors.email}
          errorMessage={validationErrors.email}
        />

        <Input
          label={tUser("phoneNumber")}
          labelPlacement="outside"
          type="tel"
          id="phoneNumber"
          isRequired
          value={formData.phoneNumber}
          onValueChange={(value) => handleValueChange("phoneNumber", value)}
          onBlur={() => handleBlur("phoneNumber")}
          isInvalid={!!validationErrors.phoneNumber}
          errorMessage={validationErrors.phoneNumber}
        />
      </div>

      <Input
        label={tUser("address")}
        labelPlacement="outside"
        id="address"
        isRequired
        value={formData.address}
        onValueChange={(value) => handleValueChange("address", value)}
        onBlur={() => handleBlur("address")}
        isInvalid={!!validationErrors.address}
        errorMessage={validationErrors.address}
      />

      <Input
        label={t("username")}
        labelPlacement="outside"
        id="username"
        isRequired
        value={formData.username}
        onValueChange={(value) => handleValueChange("username", value)}
        onBlur={() => handleBlur("username")}
        isInvalid={!!validationErrors.username}
        errorMessage={validationErrors.username}
      />

      <div className="space-y-2 w-full">
        <Input
          label={t("password")}
          labelPlacement="outside"
          type="password"
          id="password"
          isRequired
          value={formData.password}
          onValueChange={(value) => handleValueChange("password", value)}
          onBlur={() => handleBlur("password")}
          isInvalid={!!validationErrors.password}
          errorMessage={validationErrors.password}
          endContent={
            <Popover placement="right">
              <PopoverTrigger>
                <Button isIconOnly size="sm" color="primary" radius="full">
                  ?
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">
                    {t("passwordRequirements.title")}
                  </div>
                  <ul className="text-tiny pl-4 mt-1 list-disc">
                    <li>{t("passwordRequirements.length")}</li>
                    <li>{t("passwordRequirements.letter")}</li>
                    <li>{t("passwordRequirements.number")}</li>
                    <li>{t("passwordRequirements.latin")}</li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          }
        />

        {formData.password && (
          <div className="space-y-1">
            <Progress
              aria-label={t("passwordStrength.label")}
              color={passwordStrength.color}
              value={passwordStrength.score}
              className="h-2"
            />
            <div className="flex justify-between text-xs">
              <span>{t("passwordStrength.strength")}</span>
              <span className={`font-medium text-${passwordStrength.color}`}>
                {passwordStrength.label}
              </span>
            </div>
          </div>
        )}
      </div>

      <Input
        label={t("confirmPassword")}
        labelPlacement="outside"
        type="password"
        id="confirmPassword"
        isRequired
        value={formData.confirmPassword}
        onValueChange={(value) => handleValueChange("confirmPassword", value)}
        onBlur={() => handleBlur("confirmPassword")}
        isInvalid={!!validationErrors.confirmPassword}
        errorMessage={validationErrors.confirmPassword}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/auth/login"
            className="font-medium text-[var(--primary)]"
          >
            {t("alreadyHaveAccount")}
          </Link>
        </div>
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting} color="primary">
        {t("register")}
      </Button>
    </Form>
  );
}
