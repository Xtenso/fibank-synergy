"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../lib/auth";
import { Form, Input, Button, Checkbox } from "@heroui/react";
import { Link } from "@/i18n/navigation";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleValueChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateField = (field: string): string | null => {
    switch (field) {
      case "uin":
        if (!formData.uin) {
          return tUser("errors.uinRequired");
        } else if (formData.uin.length !== 10) {
          return tUser("errors.uinLength");
        } else if (!/^[0-9]+$/.test(formData.uin)) {
          return tUser("errors.uinFormat");
        }
        break;

      case "nameCyrillic":
        if (!formData.nameCyrillic) {
          return tUser("errors.nameCyrillicRequired");
        } else if (!/^[\u0400-\u04FF\s-]+$/.test(formData.nameCyrillic)) {
          return tUser("errors.nameCyrillicFormat");
        } else if (formData.nameCyrillic.trim().split(/\s+/).length < 2) {
          return tUser("errors.nameFullRequired");
        } else if (
          formData.nameCyrillic
            .trim()
            .split(/\s+/)
            .some((part) => part.length < 3)
        ) {
          return tUser("errors.namePartLength");
        }
        break;

      case "nameLatin":
        if (!formData.nameLatin) {
          return tUser("errors.nameLatinRequired");
        } else if (!/^[A-Za-z\s-]+$/.test(formData.nameLatin)) {
          return tUser("errors.nameLatinFormat");
        } else if (formData.nameLatin.trim().split(/\s+/).length < 2) {
          return tUser("errors.nameFullRequired");
        } else if (
          formData.nameLatin
            .trim()
            .split(/\s+/)
            .some((part) => part.length < 3)
        ) {
          return tUser("errors.namePartLength");
        }
        break;

      case "phoneNumber":
        if (!formData.phoneNumber) {
          return tUser("errors.phoneRequired");
        } else if (formData.phoneNumber.length < 10) {
          return tUser("errors.phoneLength");
        } else if (!/^\+?[0-9\s-]+$/.test(formData.phoneNumber)) {
          return tUser("errors.phoneFormat");
        }
        break;

      case "address":
        if (!formData.address) {
          return tUser("errors.addressRequired");
        } else if (formData.address.length < 10) {
          return tUser("errors.addressLength");
        }
        break;

      case "username":
        if (!formData.username) {
          return t("errors.usernameRequired");
        } else if (formData.username.length < 5) {
          return t("errors.usernameMinLength");
        } else if (!/^[a-zA-Z_-]+$/.test(formData.username)) {
          return t("errors.usernameFormat");
        }
        break;

      case "email":
        if (!formData.email) {
          return tUser("errors.emailRequired");
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          return tUser("errors.emailInvalid");
        }
        break;

      case "password":
        if (!formData.password) {
          return t("errors.passwordRequired");
        } else if (formData.password.length < 6) {
          return t("errors.passwordLength");
        } else if (formData.password.length > 24) {
          return t("errors.passwordMaxLength");
        } else if (!/[a-zA-Z]/.test(formData.password)) {
          return t("errors.passwordLetter");
        } else if (!/[0-9]/.test(formData.password)) {
          return t("errors.passwordNumber");
        } else if (
          !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(
            formData.password
          )
        ) {
          return t("errors.passwordFormat");
        }
        if (touchedFields.confirmPassword && formData.confirmPassword) {
          const confirmError = validateField("confirmPassword");
          if (confirmError) {
            setValidationErrors((prev) => ({
              ...prev,
              confirmPassword: confirmError,
            }));
          } else {
            setValidationErrors((prev) => {
              const { confirmPassword, ...rest } = prev;
              return rest;
            });
          }
        }
        break;

      case "confirmPassword":
        if (!formData.confirmPassword) {
          return t("errors.confirmPasswordRequired");
        } else if (formData.confirmPassword !== formData.password) {
          return t("errors.passwordsDoNotMatch");
        }
        break;
    }
    return null;
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
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form className="space-y-4" onSubmit={handleSubmit}>
      {authError && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700">
          {authError}
        </div>
      )}

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
      />

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
