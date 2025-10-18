import { useState } from 'react';
import { SplashScreen, OnboardingScreen, LoginScreen, PledgeScreen } from './components/auth';
import { MainApp, LanguageProvider } from './components/shared';

export type AuthScreen = 'splash' | 'onboarding' | 'login' | 'pledge' | 'main';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('splash');
  const [userPhone, setUserPhone] = useState('');

  // Auto-transition from splash to onboarding after 2 seconds
  useState(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('onboarding'), 2000);
    }
  });

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {/* Screen content */}
        <div className="h-full overflow-hidden">
          {currentScreen === 'splash' && <SplashScreen />}
          {currentScreen === 'onboarding' && <OnboardingScreen onComplete={() => setCurrentScreen('login')} />}
          {currentScreen === 'login' && <LoginScreen onContinue={(phone) => { setUserPhone(phone); setCurrentScreen('pledge'); }} />}
          {currentScreen === 'pledge' && <PledgeScreen onAccept={() => setCurrentScreen('main')} />}
          {currentScreen === 'main' && <MainApp userPhone={userPhone} />}
        </div>
      </div>
    </LanguageProvider>
  );
}
