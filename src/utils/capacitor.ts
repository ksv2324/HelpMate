import { Capacitor } from '@capacitor/core';

// Dynamic imports for Capacitor plugins to avoid build issues
let SplashScreen: any = null;
let StatusBar: any = null;
let CapApp: any = null;

// Load plugins dynamically
const loadPlugins = async () => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const [splashModule, statusModule, appModule] = await Promise.all([
      import('@capacitor/splash-screen'),
      import('@capacitor/status-bar'),
      import('@capacitor/app')
    ]);

    SplashScreen = splashModule.SplashScreen;
    StatusBar = statusModule.StatusBar;
    CapApp = appModule.App;
  } catch (error) {
    console.warn('Capacitor plugins not available:', error);
  }
};

/**
 * Capacitor utilities for native features
 */
export class CapacitorUtils {
  /**
   * Check if running in a native app context
   */
  static isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  /**
   * Initialize all Capacitor plugins
   */
  static async initialize(): Promise<void> {
    if (!this.isNative()) {
      console.log('Running in web mode, Capacitor plugins not available');
      return;
    }

    await loadPlugins();

    try {
      // Hide splash screen after app loads
      if (SplashScreen) {
        await SplashScreen.hide();
      }

      // Configure status bar
      if (StatusBar) {
        await StatusBar.setStyle({ style: 'Light' });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });
      }

      console.log('Capacitor plugins initialized');
    } catch (error) {
      console.error('Error initializing Capacitor plugins:', error);
    }
  }

  /**
   * Show splash screen
   */
  static async showSplash(): Promise<void> {
    if (!this.isNative() || !SplashScreen) return;

    try {
      await SplashScreen.show({
        showDuration: 2000,
        autoHide: true,
      });
    } catch (error) {
      console.error('Error showing splash screen:', error);
    }
  }

  /**
   * Hide splash screen
   */
  static async hideSplash(): Promise<void> {
    if (!this.isNative() || !SplashScreen) return;

    try {
      await SplashScreen.hide();
    } catch (error) {
      console.error('Error hiding splash screen:', error);
    }
  }

  /**
   * Set status bar style
   */
  static async setStatusBarStyle(isDark: boolean): Promise<void> {
    if (!this.isNative() || !StatusBar) return;

    try {
      await StatusBar.setStyle({
        style: isDark ? 'Dark' : 'Light'
      });
    } catch (error) {
      console.error('Error setting status bar style:', error);
    }
  }

  /**
   * Register app state change listeners
   */
  static registerAppStateListeners(
    onResume?: () => void,
    onPause?: () => void,
  ): void {
    if (!this.isNative() || !CapApp) return;

    if (onResume) {
      CapApp.addListener('resume', onResume);
    }

    if (onPause) {
      CapApp.addListener('pause', onPause);
    }
  }

  /**
   * Handle back button (Android)
   */
  static registerBackButtonListener(handler: () => boolean): void {
    if (!this.isNative() || !CapApp) return;

    CapApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        CapApp.exitApp();
      } else {
        const shouldExit = handler();
        if (shouldExit) {
          CapApp.exitApp();
        }
      }
    });
  }

  /**
   * Get app info
   */
  static async getAppInfo(): Promise<any> {
    if (!this.isNative()) {
      return {
        name: 'HelpMate',
        id: 'io.novanexus.helpmate',
        version: '0.1.0',
        build: '1',
      };
    }

    if (!CapApp) {
      return {
        name: 'HelpMate',
        id: 'io.novanexus.helpmate',
        version: '0.1.0',
        build: '1',
      };
    }

    try {
      return await CapApp.getInfo();
    } catch (error) {
      console.error('Error getting app info:', error);
      return {
        name: 'HelpMate',
        id: 'io.novanexus.helpmate',
        version: '0.1.0',
        build: '1',
      };
    }
  }
}
