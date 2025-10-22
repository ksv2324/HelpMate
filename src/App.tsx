import { useState, useEffect } from 'react';
import { 
  SplashScreen, 
  OnboardingScreen, 
  LanguageSelectionScreen,
  UserDetailsScreen,
  AadharInputScreen,
  OtpScreen,
  RoleSelectionScreen,
  VerificationScreen,
  PledgeScreen 
} from './components/auth';
import { MainApp, LanguageProvider } from './components/shared';
import { CapacitorUtils } from './utils';
import { AuthScreen, UserRole, VerificationType } from './types';

interface UserData {
  language: string;
  name: string;
  phone: string;
  email?: string;
  aadhar: string;
  role: UserRole;
  verificationType: VerificationType;
  verificationDocuments: File[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('splash');
  const [userData, setUserData] = useState<Partial<UserData>>({});

  // Auto-transition from splash to onboarding after 2 seconds
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('onboarding'), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Register back button handler for Android
  useEffect(() => {
    CapacitorUtils.registerBackButtonListener(() => {
      // Return true to exit app on back button press
      return currentScreen === 'onboarding' || currentScreen === 'language';
    });
  }, [currentScreen]);

  const handleLanguageSelect = (language: string) => {
    setUserData({ ...userData, language });
    setCurrentScreen('userDetails');
  };

  const handleUserDetails = (details: { name: string; phone: string; email?: string }) => {
    setUserData({ ...userData, ...details });
    setCurrentScreen('aadhar');
  };

  const handleAadharInput = (aadhar: string) => {
    setUserData({ ...userData, aadhar });
    setCurrentScreen('otp');
  };

  const handleOtpVerified = () => {
    setCurrentScreen('role');
  };

  const handleRoleSelection = (role: UserRole) => {
    setUserData({ ...userData, role });
    // Skip verification for donors
    if (role === 'donor') {
      setCurrentScreen('pledge');
    } else {
      setCurrentScreen('verification');
    }
  };

  const handleVerificationComplete = (verificationType: VerificationType, documents: File[]) => {
    setUserData({ ...userData, verificationType, verificationDocuments: documents });
    setCurrentScreen('pledge');
  };

  const handleVerificationSkip = () => {
    setUserData({ ...userData, verificationType: 'none', verificationDocuments: [] });
    setCurrentScreen('pledge');
  };

  const handleBack = (targetScreen: AuthScreen) => {
    setCurrentScreen(targetScreen);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white flex items-center justify-center">
        {/* Screen content */}
        <div className="h-screen overflow-hidden">
          {currentScreen === 'splash' && <SplashScreen />}
          
          {currentScreen === 'onboarding' && (
            <OnboardingScreen onComplete={() => setCurrentScreen('language')} />
          )}
          
          {currentScreen === 'language' && (
            <LanguageSelectionScreen 
              onComplete={handleLanguageSelect}
              onBack={() => handleBack('onboarding')}
            />
          )}
          
          {currentScreen === 'userDetails' && (
            <UserDetailsScreen 
              onComplete={handleUserDetails}
              onBack={() => handleBack('language')}
            />
          )}
          
          {currentScreen === 'aadhar' && (
            <AadharInputScreen
              onComplete={handleAadharInput}
              onBack={() => handleBack('userDetails')}
            />
          )}
          
          {currentScreen === 'otp' && (
            <OtpScreen
              aadhar={userData.aadhar}
              phone={userData.phone}
              onVerify={handleOtpVerified}
              onBack={() => handleBack('aadhar')}
            />
          )}
          
          {currentScreen === 'role' && (
            <RoleSelectionScreen
              onComplete={handleRoleSelection}
              onBack={() => handleBack('otp')}
            />
          )}
          
          {currentScreen === 'verification' && (
            <VerificationScreen
              role={userData.role!}
              onComplete={handleVerificationComplete}
              onSkip={handleVerificationSkip}
              onBack={() => handleBack('role')}
            />
          )}
          
          {currentScreen === 'pledge' && (
            <PledgeScreen onAccept={() => setCurrentScreen('main')} />
          )}
          
          {currentScreen === 'main' && (
            <MainApp userPhone={userData.phone || ''} />
          )}
        </div>
      </div>
    </LanguageProvider>
  );
}
