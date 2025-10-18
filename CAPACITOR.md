# Capacitor Android App Setup

This document describes the Capacitor.js integration for converting the Hand2Hand web app into a native Android application.

## Overview

The project now uses [Capacitor](https://capacitorjs.com/) to build native Android applications from the React web app. Capacitor provides native APIs and a bridge between the web app and native Android features.

## Capacitor Plugins Used

- **@capacitor/core**: Core Capacitor functionality
- **@capacitor/android**: Android platform support
- **@capacitor/splash-screen**: Native splash screen handling
- **@capacitor/status-bar**: Status bar customization
- **@capacitor/app**: App lifecycle and back button handling

## Project Structure

```
├── capacitor.config.ts       # Capacitor configuration
├── android/                  # Android native project (auto-generated)
├── src/
│   ├── utils/
│   │   └── capacitor.ts     # Capacitor utility functions
│   └── ...
```

## Available Scripts

```bash
# Build web app
npm run build

# Sync web assets to Android platform
npm run sync

# Sync only Android (after building)
npm run sync:android

# Open Android project in Android Studio
npm run open:android

# Build and open Android in one command
npm run run:android
```

## Development Workflow

### Web Development
```bash
npm run dev
```
This runs the app in web mode at http://localhost:3000

### Android Development

1. **Build the web app:**
   ```bash
   npm run build
   ```

2. **Sync with Capacitor:**
   ```bash
   npm run sync:android
   ```

3. **Open in Android Studio:**
   ```bash
   npm run open:android
   ```

4. **Run on Android device/emulator:**
   - Use Android Studio's Run button, or
   - Use `./gradlew installDebug` from the `android/` directory

## Native Features Integration

The app uses native features through the `CapacitorUtils` class:

### Splash Screen
- Automatically shown on app launch
- Configured in `capacitor.config.ts`
- Hidden after app initialization

### Status Bar
- Configured to light style with white background
- Customizable per-screen if needed

### Back Button (Android)
- Handled through `CapacitorUtils.registerBackButtonListener()`
- Exits app when on the onboarding screen
- Custom back navigation for other screens

### App Lifecycle
- Resume/Pause events can be listened to
- Useful for refreshing data or pausing animations

## Configuration

### capacitor.config.ts

Key configuration options:
- `appId`: Bundle identifier (io.novanexus.hand2hand)
- `appName`: Display name (Hand2Hand)
- `webDir`: Build output directory (build/)
- Plugin configurations for SplashScreen and StatusBar

## GitHub Actions Workflows

### Android Build Workflow
**File:** `.github/workflows/android-build.yml`

Triggers on:
- Push to main/master with `[Update]` in commit message
- Pull requests to main/master

Outputs:
- Debug APK artifact (hand2hand-debug-apk)
- Release APK artifact (hand2hand-release-apk, unsigned)

### GitHub Pages Workflow
**File:** `.github/workflows/github-pages.yml`

Triggers on:
- Push to main/master
- Manual workflow dispatch

Deploys the web version to GitHub Pages.

## Building Signed Release APK

To create a signed release APK for Google Play:

1. Generate a keystore:
   ```bash
   keytool -genkey -v -keystore hand2hand.keystore -alias hand2hand -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Configure signing in `android/app/build.gradle`:
   ```gradle
   signingConfigs {
       release {
           storeFile file("path/to/hand2hand.keystore")
           storePassword "your-store-password"
           keyAlias "hand2hand"
           keyPassword "your-key-password"
       }
   }
   ```

3. Build release APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

## Troubleshooting

### Android Build Issues

**Gradle sync failed:**
- Ensure JDK 17 is installed
- Check Android SDK is properly installed
- Try `./gradlew clean` in the android directory

**Assets not updating:**
- Run `npm run sync:android` to sync latest web assets
- Clear Android build cache in Android Studio

### Web Mode vs Native Mode

The app automatically detects if it's running in native mode:
```typescript
CapacitorUtils.isNative() // returns true on Android, false on web
```

Native APIs are only called when running on a native platform, so the web version works without any native dependencies.

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Development](https://capacitorjs.com/docs/android)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)
- [Capacitor Community Plugins](https://github.com/capacitor-community)

## Next Steps

Consider adding more native features:
- **Camera**: Take photos for donations
- **Geolocation**: Show nearby donations on map
- **Push Notifications**: Notify users of new donations
- **Share**: Share donations with others
- **Haptics**: Add tactile feedback
- **Biometric Auth**: Secure authentication

Install additional plugins as needed:
```bash
npm install @capacitor/camera @capacitor/geolocation @capacitor/push-notifications
```
