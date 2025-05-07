'use client';

import { useState } from 'react';
import { useAuth } from '../../lib/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Link from 'next/link';

export default function LoginForm() {
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await login(email, password);
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
        label="Email address"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      
      <Input
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
      
      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}