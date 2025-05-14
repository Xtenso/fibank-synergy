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
  Divider,
} from "@heroui/react";
import { Link } from "@/i18n/navigation";
import { calculatePasswordStrength } from "../../utils/passwordStrength";
import { createValidator } from "../../utils/validation";

export default function RegisterForm() {
  const t = useTranslations("auth");
  const tUser = useTranslations("user");
  const { register } = useAuth();
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

  const validateField = (fieldName: string) => {
    return createValidator(fieldName, formData, t, tUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (error: any) {
      let errorKey = "registerError";
      const errorMessage =
        error?.response?.data?.message || error?.message || "";

      if (errorMessage.includes("email already exists")) {
        errorKey = "emailExists";
      } else if (errorMessage.includes("Username already taken")) {
        errorKey = "usernameExists";
      }

      addToast({
        title: t("registerFailed"),
        description: t(errorKey),
        variant: "solid",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        label={tUser("uin")}
        id="uin"
        isRequired
        value={formData.uin}
        onValueChange={(value) => handleValueChange("uin", value)}
        validate={validateField("uin")}
      />

      <Input
        label={tUser("uinForeigner")}
        id="uinForeigner"
        value={formData.uinForeigner}
        onValueChange={(value) => handleValueChange("uinForeigner", value)}
        validate={validateField("uinForeigner")}
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
          id="nameCyrillic"
          isRequired
          value={formData.nameCyrillic}
          onValueChange={(value) => handleValueChange("nameCyrillic", value)}
          validate={validateField("nameCyrillic")}
        />

        <Input
          label={tUser("nameLatin")}
          id="nameLatin"
          isRequired
          value={formData.nameLatin}
          onValueChange={(value) => handleValueChange("nameLatin", value)}
          validate={validateField("nameLatin")}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
        <Input
          label={tUser("email")}
          type="email"
          id="email"
          isRequired
          value={formData.email}
          onValueChange={(value) => handleValueChange("email", value)}
          validate={validateField("email")}
        />

        <Input
          label={tUser("phoneNumber")}
          type="tel"
          id="phoneNumber"
          isRequired
          value={formData.phoneNumber}
          onValueChange={(value) => handleValueChange("phoneNumber", value)}
          validate={validateField("phoneNumber")}
        />
      </div>

      <Input
        label={tUser("address")}
        id="address"
        isRequired
        value={formData.address}
        onValueChange={(value) => handleValueChange("address", value)}
        validate={validateField("address")}
      />

      <Divider className="my-4" />

      <Input
        label={tUser("username")}
        id="username"
        isRequired
        value={formData.username}
        onValueChange={(value) => handleValueChange("username", value)}
        validate={validateField("username")}
      />

      <div className="space-y-2 w-full">
        <Input
          label={tUser("password")}
          type="password"
          id="password"
          isRequired
          value={formData.password}
          onValueChange={(value) => handleValueChange("password", value)}
          validate={validateField("password")}
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
        label={tUser("confirmPassword")}
        type="password"
        id="confirmPassword"
        isRequired
        value={formData.confirmPassword}
        onValueChange={(value) => handleValueChange("confirmPassword", value)}
        validate={validateField("confirmPassword")}
      />

      <Divider className="my-4" />

      <div>
        <p className="text-sm text-gray-600 mb-4">{t("registerReminder")}</p>
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          color="primary"
        >
          {t("register")}
        </Button>
      </div>
      <div className="flex justify-center w-full">
        <div className="text-sm">
          <Link
            href="/auth/login"
            className="font-medium text-[var(--primary)]"
          >
            {t("alreadyHaveAccount")}
          </Link>
        </div>
      </div>
    </Form>
  );
}
