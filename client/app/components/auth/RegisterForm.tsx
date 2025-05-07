"use client";

import { useState } from "react";
import { useAuth } from "../../lib/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Link from "next/link";

export default function RegisterForm() {
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
      newErrors.uin = "UIN is required";
    } else if (formData.uin.length != 10) {
      newErrors.uin = "UIN must be 10 characters long";
    } else if (!/^[0-9]+$/.test(formData.uin)) {
      newErrors.uin = "UIN can only contain numbers";
    }

    // Cyrillic name validation
    if (!formData.nameCyrillic) {
      newErrors.nameCyrillic = "Name in Cyrillic is required";
    } else if (!/^[\u0400-\u04FF\s-]+$/.test(formData.nameCyrillic)) {
      newErrors.nameCyrillic = "Please use only Cyrillic characters";
    } else if (formData.nameCyrillic.trim().split(/\s+/).length < 2) {
      newErrors.nameCyrillic = "Please enter full name (first and last name)";
    } else if (
      formData.nameCyrillic
        .trim()
        .split(/\s+/)
        .some((part) => part.length < 3)
    ) {
      newErrors.nameCyrillic =
        "Each part of your name must be at least 3 characters";
    }

    // Latin name validation
    if (!formData.nameLatin) {
      newErrors.nameLatin = "Name in Latin is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formData.nameLatin)) {
      newErrors.nameLatin = "Please use only Latin characters";
    } else if (formData.nameLatin.trim().split(/\s+/).length < 2) {
      newErrors.nameLatin = "Please enter full name (first and last name)";
    } else if (
      formData.nameLatin
        .trim()
        .split(/\s+/)
        .some((part) => part.length < 3)
    ) {
      newErrors.nameLatin =
        "Each part of your name must be at least 3 characters";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be 10 characters long";
    } else if (!/^\+?[0-9\s-]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number can only contain numbers, spaces, + and -";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters long";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 5) {
      newErrors.username = "Username must be at least 5 characters long";
    } else if (!/^[a-zA-Z_-]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain Latin letters, _ and -";
    }

    // Email validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 24) {
      newErrors.password = "Password must be at most 24 characters";
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (
      !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(formData.password)
    ) {
      newErrors.password =
        "Password can only contain Latin letters, numbers, and special characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords don't match";
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
        label="UIN (Personal ID)"
        id="uin"
        value={formData.uin}
        onChange={handleChange}
        error={errors.uin}
      />

      <Input
        label="UIN Foreigner (Optional)"
        id="uinForeigner"
        value={formData.uinForeigner}
        onChange={handleChange}
        error={errors.uinForeigner}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Name in Cyrillic (Джон Смег)"
          id="nameCyrillic"
          value={formData.nameCyrillic}
          onChange={handleChange}
          error={errors.nameCyrillic}
        />

        <Input
          label="Name in Latin (John Smeg)"
          id="nameLatin"
          value={formData.nameLatin}
          onChange={handleChange}
          error={errors.nameLatin}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Email address"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Phone number"
          type="tel"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
      </div>

      <Input
        label="Address"
        id="address"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <Input
        label="Username"
        id="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />

      <Input
        label="Password"
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Input
        label="Confirm password"
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
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Create account
      </Button>
    </form>
  );
}
