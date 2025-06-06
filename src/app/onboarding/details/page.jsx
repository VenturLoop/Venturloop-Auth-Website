'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // For image preview
import { useOnboarding } from '@/contexts/OnboardingContext';
import SpliteScreen from '@/components/SpliteScreen';
import Input from '@/components/Input';
import Button from '@/components/Button';

const BasicDetailsPage = () => {
  const router = useRouter();
  const { onboardingData, updateOnboardingData, nextStep, prevStep, currentStep, steps } = useOnboarding();

  const [profileImage, setProfileImage] = useState(onboardingData.profileImage || null); // File object or URL string if already uploaded
  const [profileImagePreview, setProfileImagePreview] = useState(onboardingData.profileImagePreview || null);
  const [location, setLocation] = useState(onboardingData.location || '');
  const [birthday, setBirthday] = useState(onboardingData.birthday || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill form if data exists in context (e.g., user navigates back)
  useEffect(() => {
    if (onboardingData) {
      if (onboardingData.profileImagePreview) setProfileImagePreview(onboardingData.profileImagePreview);
      // Note: File object for profileImage cannot be easily pre-filled if it was the actual File object.
      // Typically, you'd store the URL of an uploaded image. For this mock, we'll primarily rely on preview.
      if (onboardingData.location) setLocation(onboardingData.location);
      if (onboardingData.birthday) setBirthday(onboardingData.birthday);
    }
  }, [onboardingData]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfileImage(file); // Store the file object itself for potential upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result); // For local preview
      };
      reader.readAsDataURL(file);
      setError('');
    } else {
      setProfileImage(null);
      setProfileImagePreview(null);
      setError('Please select a valid image file.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation (can be expanded)
    if (!location || !birthday) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const currentStepData = {
      profileImage: profileImage, // Could be File object or a URL if uploaded elsewhere
      profileImagePreview: profileImagePreview, // Store preview URL for display
      location,
      birthday,
    };

    updateOnboardingData(currentStepData);
    console.log('Updated onboarding data:', { ...onboardingData, ...currentStepData });

    // Navigate to the next step defined in OnboardingContext
    // Assuming 'details' is a step name in your ONBOARDING_STEPS array
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex !== -1 && currentIndex < steps.length - 1) {
        const nextStepPath = steps[currentIndex + 1];
        router.push(`/onboarding/${nextStepPath.toLowerCase()}`);
    } else {
        // Fallback or error if next step isn't found, or it's the last step
        router.push('/onboarding/questionnaire'); // Fallback to questionnaire for now
    }
    // Or simply call nextStep() if it handles navigation internally or just state
    // nextStep();
    // And then rely on a useEffect elsewhere to navigate based on currentStep change.
    // For direct navigation, router.push is clearer here.

    setLoading(false);
  };

  const handlePrev = () => {
    // prevStep(); // Update context state
    // router.push('/previous-page'); // Or determine dynamically
    // For now, let's assume direct navigation or this step is first after auth.
    router.back(); // Simple browser back
  };


  return (
    <SpliteScreen>
      <div className="w-full max-w-lg space-y-6 mx-auto"> {/* Increased max-width for better layout */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tell Us About Yourself
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Let&apos;s get your profile started with some basic details.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            {profileImagePreview && (
              <div className="mt-2 mb-4 flex justify-center">
                <Image
                  src={profileImagePreview}
                  alt="Profile Preview"
                  width={128} // Tailwind class h-32 w-32
                  height={128}
                  className="rounded-full object-cover h-32 w-32"
                />
              </div>
            )}
            <Input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              inputClassName="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB.</p>
          </div>

          <Input
            label="Your Location"
            type="text"
            name="location"
            placeholder="e.g., San Francisco, CA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={loading}
            required
          />

          <Input
            label="Your Birthday"
            type="date"
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            disabled={loading}
            required
          />

          {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrev}
              className="w-full sm:w-auto"
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:flex-grow"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Continue'}
            </Button>
          </div>
        </form>
      </div>
    </SpliteScreen>
  );
};

export default BasicDetailsPage;
