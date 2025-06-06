'use client'; // Required for components using hooks

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SpliteScreen from '@/components/SpliteScreen';
import Input from '@/components/Input';
import Button from '@/components/Button';
// import { Toaster, toast } from 'react-hot-toast'; // Already in SpliteScreen

const CreatePasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // To potentially get a reset token

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // In a real app, a token would be passed via URL to validate the password reset request
  const token = searchParams.get('token');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (newPassword.length < 8) { // Basic password strength check
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    // Mock password reset logic
    // In a real app: await api.resetPassword(token, newPassword);
    console.log('Attempting to reset password with token:', token, 'and new password:', newPassword);
    if (token || !process.env.NEXT_PUBLIC_REQUIRE_TOKEN_FOR_PASSWORD_RESET) { // Simulate success if token exists or if not strictly required for mock
      setSuccessMessage('Password has been reset successfully! Redirecting to login...');
      // toast.success('Password reset successfully!');
      console.log('Password reset successful.');
      setTimeout(() => {
        router.push('/login');
      }, 2000); // Delay redirect for user to see message
    } else {
      setError('Invalid or missing password reset token.');
      // toast.error('Invalid or missing password reset token.');
      console.log('Password reset failed: Invalid or missing token.');
      setLoading(false); // Keep button active if error and no redirect
    }
    // setLoading(false) // setLoading to false will happen after timeout or in error case
  };

  return (
    <SpliteScreen>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your new password must be different from previously used passwords and at least 8 characters long.
          </p>
        </div>

        {token === null && process.env.NEXT_PUBLIC_REQUIRE_TOKEN_FOR_PASSWORD_RESET && (
           <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">
            Missing password reset token. Please initiate the password reset process again.
          </p>
        )}


        <form className="space-y-6" onSubmit={handleResetPassword}>
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading || successMessage}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading || successMessage}
            required
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {successMessage && <p className="text-sm text-green-600 text-center">{successMessage}</p>}

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading || successMessage || (process.env.NEXT_PUBLIC_REQUIRE_TOKEN_FOR_PASSWORD_RESET && !token)}
            >
              {loading ? 'Setting Password...' : 'Set New Password'}
            </Button>
          </div>
        </form>
         {successMessage && (
          <div className="text-sm text-center mt-4">
            <p>You will be redirected to the <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Login page</Link> shortly.</p>
          </div>
        )}
      </div>
    </SpliteScreen>
  );
};

export default CreatePasswordPage;
