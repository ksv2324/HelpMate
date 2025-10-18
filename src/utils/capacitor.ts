import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App as CapApp } from '@capacitor/app';

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

    try {
      // Hide splash screen after app loads
      await SplashScreen.hide();
      
      // Configure status bar
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
      
      console.log('Capacitor plugins initialized');
    } catch (error) {
      console.error('Error initializing Capacitor plugins:', error);
    }
  }

  /**
   * Show splash screen
   */
  static async showSplash(): Promise<void> {
    if (!this.isNative()) return;
    
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
    if (!this.isNative()) return;
    
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
    if (!this.isNative()) return;
    
    try {
      await StatusBar.setStyle({ 
        style: isDark ? Style.Dark : Style.Light 
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
    if (!this.isNative()) return;

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
    if (!this.isNative()) return;

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
        name: 'Hand2Hand',
        id: 'io.novanexus.hand2hand',
        version: '0.1.0',
        build: '1',
      };
    }

    try {
      return await CapApp.getInfo();
    } catch (error) {
      console.error('Error getting app info:', error);
      return null;
    }
  }
}
