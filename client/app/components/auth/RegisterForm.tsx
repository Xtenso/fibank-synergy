"use client";

import { useState } from "react";
import { useAuth } from "../../lib/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Link from "next/link";

export default function RegisterForm() {
  const { register, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
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

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords don't match";

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First name"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          label="Last name"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </div>

      <Input
        label="Email address"
        type="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
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
