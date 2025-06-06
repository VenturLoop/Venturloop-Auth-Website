import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Define a sequence of onboarding steps
const ONBOARDING_STEPS = ['profile', 'interests', 'summary', 'complete']; // Example steps

// 1. Define the context
const OnboardingContext = createContext(null);

// 2. Create an OnboardingProvider component
export const OnboardingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(ONBOARDING_STEPS[0]);
  const [onboardingData, setOnboardingData] = useState({});

  // Function to advance to the next step
  const nextStep = () => {
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    if (currentIndex < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(ONBOARDING_STEPS[currentIndex + 1]);
      console.log('Onboarding: Advanced to step ->', ONBOARDING_STEPS[currentIndex + 1]);
    } else {
      console.log('Onboarding: Already at the last step.');
    }
  };

  // Function to go back to the previous step
  const prevStep = () => {
    const currentIndex = ONBOARDING_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(ONBOARDING_STEPS[currentIndex - 1]);
      console.log('Onboarding: Returned to step ->', ONBOARDING_STEPS[currentIndex - 1]);
    } else {
      console.log('Onboarding: Already at the first step.');
    }
  };

  // Function to update onboarding data
  const updateOnboardingData = (newData) => {
    setOnboardingData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      console.log('Onboarding: Data updated ->', updatedData);
      return updatedData;
    });
  };

  // Function to reset onboarding state
  const resetOnboarding = () => {
    setCurrentStep(ONBOARDING_STEPS[0]);
    setOnboardingData({});
    console.log('Onboarding: State reset.');
  };

  // 3. Provide currentStep, onboardingData, and functions through the context value
  const value = {
    currentStep,
    onboardingData,
    nextStep,
    prevStep,
    updateOnboardingData,
    resetOnboarding,
    steps: ONBOARDING_STEPS, // Expose steps array if needed by consumers
    isFirstStep: currentStep === ONBOARDING_STEPS[0],
    isLastStep: currentStep === ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1],
    currentStepIndex: ONBOARDING_STEPS.indexOf(currentStep),
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

OnboardingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 4. Create a custom hook for easy consumption of the context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined || context === null) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// Export the context itself if needed
export default OnboardingContext;
