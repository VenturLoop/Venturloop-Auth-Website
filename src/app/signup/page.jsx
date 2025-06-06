'use client'; // Required for components using hooks like useState, useRouter

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; // Assuming @ is src
import SpliteScreen from '@/components/SpliteScreen';
import Input from '@/components/Input';
import Button from '@/components/Button';

const SignupPage = () => {
  const router = useRouter();
  const auth = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      await auth.signup(name, email, password);
      // On successful signup, AuthContext would set isAuthenticated to true.
      // Redirect to the first step of onboarding or a dashboard.
      router.push('/onboarding'); // Or '/onboarding/profile' or a specific first step
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    // Mock social signup
    console.log(`Attempting signup with ${provider}`);
    // In a real app, this would redirect to an OAuth flow and then potentially to a completion step.
    // For this mock, we'll simulate a successful signup.
    auth.signup(`${provider}User`, `${provider.toLowerCase()}@example.com`, 'socialpassword')
      .then(() => {
        router.push('/onboarding'); // Or '/onboarding/profile'
      })
      .catch((err) => {
        setError(`Mock ${provider} signup failed: ${err.message}`);
      });
  };

  return (
    <SpliteScreen>
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="space-y-4">
          <Button
            variant="social-google"
            onClick={() => handleSocialSignup('Google')}
            className="w-full"
            disabled={loading}
          >
            Sign up with Google
          </Button>
          <Button
            variant="social-linkedin"
            onClick={() => handleSocialSignup('LinkedIn')}
            className="w-full"
            disabled={loading}
          >
            Sign up with LinkedIn
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

        <form className="space-y-6" onSubmit={handleSignup}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
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
            placeholder="•••••••• (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <div className="text-sm text-center">
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </SpliteScreen>
  );
};

export default SignupPage;
