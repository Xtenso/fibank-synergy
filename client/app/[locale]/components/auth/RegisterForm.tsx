"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../lib/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
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
  const [errors, setErrors] = useState<{
    uin?: string;
    uinForeigner?: string;
    nameCyrillic?: string;
    nameLatin?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Required fields
    if (!formData.uin) {
      newErrors.uin = tUser("errors.uinRequired");
    } else if (formData.uin.length != 10) {
      newErrors.uin = tUser("errors.uinLength");
    } else if (!/^[0-9]+$/.test(formData.uin)) {
      newErrors.uin = tUser("errors.uinFormat");
    }

    // Cyrillic name validation
    if (!formData.nameCyrillic) {
      newErrors.nameCyrillic = tUser("errors.nameCyrillicRequired");
    } else if (!/^[\u0400-\u04FF\s-]+$/.test(formData.nameCyrillic)) {
      newErrors.nameCyrillic = tUser("errors.nameCyrillicFormat");
    } else if (formData.nameCyrillic.trim().split(/\s+/).length < 2) {
      newErrors.nameCyrillic = tUser("errors.nameFullRequired");
    } else if (
      formData.nameCyrillic
        .trim()
        .split(/\s+/)
        .some((part) => part.length < 3)
    ) {
      newErrors.nameCyrillic = tUser("errors.namePartLength");
    }

    // Latin name validation
    if (!formData.nameLatin) {
      newErrors.nameLatin = tUser("errors.nameLatinRequired");
    } else if (!/^[A-Za-z\s-]+$/.test(formData.nameLatin)) {
      newErrors.nameLatin = tUser("errors.nameLatinFormat");
    } else if (formData.nameLatin.trim().split(/\s+/).length < 2) {
      newErrors.nameLatin = tUser("errors.nameFullRequired");
    } else if (
      formData.nameLatin
        .trim()
        .split(/\s+/)
        .some((part) => part.length < 3)
    ) {
      newErrors.nameLatin = tUser("errors.namePartLength");
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = tUser("errors.phoneRequired");
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = tUser("errors.phoneLength");
    } else if (!/^\+?[0-9\s-]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = tUser("errors.phoneFormat");
    }

    if (!formData.address) {
      newErrors.address = tUser("errors.addressRequired");
    } else if (formData.address.length < 10) {
      newErrors.address = tUser("errors.addressLength");
    }

    if (!formData.username) {
      newErrors.username = t("errors.usernameRequired");
    } else if (formData.username.length < 5) {
      newErrors.username = t("errors.usernameMinLength");
    } else if (!/^[a-zA-Z_-]+$/.test(formData.username)) {
      newErrors.username = t("errors.usernameFormat");
    }

    // Email validation
    if (!formData.email) newErrors.email = tUser("errors.emailRequired");
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = tUser("errors.emailInvalid");

    // Password validation
    if (!formData.password) {
      newErrors.password = t("errors.passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("errors.passwordLength");
    } else if (formData.password.length > 24) {
      newErrors.password = t("errors.passwordMaxLength");
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = t("errors.passwordLetter");
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = t("errors.passwordNumber");
    } else if (
      !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(formData.password)
    ) {
      newErrors.password = t("errors.passwordFormat");
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("errors.confirmPasswordRequired");
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = t("errors.passwordsDoNotMatch");
    }

    setErrors(newErrors);
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
        label={tUser("uin")}
        id="uin"
        value={formData.uin}
        onChange={handleChange}
        error={errors.uin}
      />

      <Input
        label={tUser("uinForeigner")}
        id="uinForeigner"
        value={formData.uinForeigner}
        onChange={handleChange}
        error={errors.uinForeigner}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={tUser("nameCyrillic")}
          id="nameCyrillic"
          value={formData.nameCyrillic}
          onChange={handleChange}
          error={errors.nameCyrillic}
        />

        <Input
          label={tUser("nameLatin")}
          id="nameLatin"
          value={formData.nameLatin}
          onChange={handleChange}
          error={errors.nameLatin}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={tUser("email")}
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label={tUser("phoneNumber")}
          type="tel"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
      </div>

      <Input
        label={tUser("address")}
        id="address"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <Input
        label={tUser("username")}
        id="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />

      <Input
        label={tUser("password")}
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Input
        label={tUser("confirmPassword")}
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
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

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {t("register")}
      </Button>
    </form>
  );
}
