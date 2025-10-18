# Quick Start Guide: Capacitor Android App

## For Developers

### First Time Setup

```bash
# Install dependencies
npm install

# Build the web app
npm run build

# Sync with Android (creates android/ folder)
npm run sync:android
```

### Daily Development

**Web Development:**
```bash
npm run dev
# Opens http://localhost:3000 in browser
```

**Android Development:**
```bash
# Build and sync in one command
npm run sync:android

# Open in Android Studio
npm run open:android

# Or combine both
npm run run:android
```

### Triggering Workflows

**Android Build (APK):**
```bash
git add .
git commit -m "[Update] Add new feature"
git push
```
The `[Update]` tag triggers automatic Android build. Download APK from Actions artifacts.

**GitHub Pages:**
```bash
git push origin main
```
Automatically deploys to GitHub Pages.

## For Users

### Installing the Android App

1. Go to GitHub Actions tab
2. Find latest successful "Android Build" workflow
3. Download `hand2hand-debug-apk` artifact
4. Extract the ZIP file
5. Install `app-debug.apk` on Android device
   - Enable "Install from Unknown Sources" if needed
   - Open the APK file to install

### Using the Web App

Visit the GitHub Pages URL (will be available after first deployment to main branch)

## Native Features

The app uses native Android features:
- **Splash Screen**: Shows on app launch
- **Status Bar**: Styled to match app theme
- **Back Button**: Press to go back or exit
- **App Lifecycle**: Handles resume/pause events

All features work seamlessly without any special setup!

## Troubleshooting

### "npm run sync:android" fails
- Ensure `npm run build` completes successfully first
- Check that Node.js version is 16 or higher

### Android Studio can't open project
- Install JDK 17
- Install Android SDK (via Android Studio)
- Try syncing again: `npm run sync:android`

### Web version doesn't load native features
- This is expected! Native features only work in the Android app
- Web version works perfectly without them

## Next Steps

- Read [CAPACITOR.md](../CAPACITOR.md) for detailed documentation
- Explore [Capacitor plugins](https://capacitorjs.com/docs/plugins) for more features
- Check [integration summary](./CAPACITOR_INTEGRATION.md) for technical details
