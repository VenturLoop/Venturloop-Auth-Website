'use client'; // Required for components using hooks

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // useSearchParams to get query params
import Link from 'next/link'; // Though not explicitly used for navigation, good to have for potential links
import SpliteScreen from '@/components/SpliteScreen';
import Input from '@/components/Input';
import Button from '@/components/Button';
// Assuming you might want toast notifications for "OTP Resent"
// import { Toaster, toast } from 'react-hot-toast'; // Already in SpliteScreen

const OtpVerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Determine redirect path based on query param or default
  const nextPath = searchParams.get('next') || '/onboarding'; // Default to onboarding
  const sourceEmail = searchParams.get('email') || 'your registered email'; // Get email from query

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      setLoading(false);
      return;
    }

    // Mock OTP verification
    // In a real app, you'd call an API endpoint: await api.verifyOtp(otp, sourceEmail_or_userId);
    console.log('Verifying OTP:', otp, 'for path:', nextPath);
    if (otp === '123456') { // Mock successful OTP
      // toast.success('OTP Verified Successfully!'); // If using react-hot-toast
      console.log('OTP Verified Successfully!');
      router.push(nextPath);
    } else {
      setError('Invalid OTP. Please try again.');
      // toast.error('Invalid OTP. Please try again.');
      console.log('Invalid OTP.');
    }
    setLoading(false);
  };

  const handleResendOtp = () => {
    // Mock Resend OTP
    console.log('Resending OTP...');
    // toast.success('OTP has been resent.'); // If using react-hot-toast
    alert('OTP has been resent (mock).'); // Simple alert for now
    setResendDisabled(true);
    setCountdown(30); // Disable resend for 30 seconds
    // In a real app: await api.resendOtp(sourceEmail_or_userId);
  };

  return (
    <SpliteScreen>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code sent to <span className="font-medium">{sourceEmail}</span>.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleVerifyOtp}>
          <Input
            label="OTP Code"
            type="text" // Using text to allow for easier input and control over length/pattern
            name="otp"
            placeholder="123456"
            value={otp}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && val.length <= 6) { // Allow only digits, max 6
                setOtp(val);
              }
            }}
            inputMode="numeric" // Helps mobile users get numeric keyboard
            maxLength={6}
            disabled={loading}
            required
            inputClassName="tracking-widest text-center text-lg" // Make OTP input more prominent
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </div>
        </form>

        <div className="text-sm text-center">
          <button
            onClick={handleResendOtp}
            disabled={resendDisabled || loading}
            className="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
          </button>
        </div>
         <div className="text-sm text-center mt-4">
          <Link href="/login" className="font-medium text-gray-600 hover:text-gray-500">
            Back to Login
          </Link>
        </div>
      </div>
    </SpliteScreen>
  );
};

export default OtpVerificationPage;
