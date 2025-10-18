import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.novanexus.hand2hand',
  appName: 'Hand2Hand',
  // webDir matches vite.config.ts build.outDir setting
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
