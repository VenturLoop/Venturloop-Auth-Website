'use client'; // Required for components using hooks like useState, useRouter

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import SpliteScreen from '@/components/SpliteScreen'; // Assuming @ is src
import Input from '@/components/Input';
import Button from '@/components/Button';

const LoginPage = () => {
  const router = useRouter();
  const auth = useAuth(); // Use the useAuth hook correctly

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await auth.login(email, password);
      // On successful login, AuthContext would set isAuthenticated to true.
      // For now, we'll redirect. This could be to a dashboard or onboarding.
      router.push('/onboarding'); // Or '/dashboard' or a more appropriate page
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    console.log(`Attempting login with ${provider}`);
    // In a real app, this would redirect to an OAuth flow.
    // For this mock, we'll simulate a successful login.
    auth.login(`${provider}@example.com`, 'socialpassword') // Use mock credentials
      .then(() => {
        router.push('/onboarding'); // Or '/dashboard'
      })
      .catch((err) => {
        setError(`Mock ${provider} login failed: ${err.message}`);
      });
  };

  // Placeholder data for the left panel of SpliteScreen, if needed by the component.
  // If SpliteScreen is updated to not require `data` prop, this can be removed.
  // Based on previous subtask, SpliteScreen now uses Carousel and doesn't need `data`.

  return (
    <SpliteScreen>
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="space-y-4">
          <Button
            variant="social-google"
            onClick={() => handleSocialLogin('Google')}
            className="w-full"
            disabled={loading}
          >
            Continue with Google
          </Button>
          <Button
            variant="social-linkedin"
            onClick={() => handleSocialLogin('LinkedIn')}
            className="w-full"
            disabled={loading}
          >
            Continue with LinkedIn
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              OR
            </span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <Input
            label="Email address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>

        <div className="text-sm text-center">
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
        <div className="text-sm text-center">
          <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot Password?
          </Link>
        </div>
      </div>
    </SpliteScreen>
  );
};

export default LoginPage;
