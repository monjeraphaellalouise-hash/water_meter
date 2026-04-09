# 📱 AquaMeter Mobile App - Complete Setup Guide

## ✅ What's Been Updated

Your AquaMeter app has been converted to support:
- ✅ **Native iOS App** (iPhone/iPad)
- ✅ **Native Android App**
- ✅ **Website** (works in any browser)
- ✅ **Native Camera** (works on mobile devices)
- ✅ **Native Notifications** (iOS & Android)

---

## 📦 Step 1: Install New Packages

Open your terminal in the WaterMeter folder and run:

```bash
npm install
```

This will install all the new Capacitor packages needed for mobile apps.

---

## 🌐 Step 2: Test Website First

Before building mobile apps, make sure everything works in the browser:

```bash
npm run dev
```

Open http://localhost:5173/ in your browser and test all features.

---

## 📱 Step 3A: Build for ANDROID

### Requirements:
- **Android Studio** (download from: https://developer.android.com/studio)
- **Java Development Kit (JDK)** 11 or higher

### Steps:

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Initialize Capacitor (first time only):**
   ```bash
   npx cap init
   ```
   - App name: `AquaMeter`
   - Package ID: `com.aquameter.app`

3. **Add Android platform:**
   ```bash
   npx cap add android
   ```

4. **Sync code to Android:**
   ```bash
   npx cap sync android
   ```

5. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

6. **In Android Studio:**
   - Wait for Gradle build to finish
   - Connect your Android phone via USB (enable USB Debugging in Developer Options)
   - Click the green **Run** button ▶️
   - Select your device
   - The app will install and open on your phone!

### Build APK File:
In Android Studio:
1. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete
3. Click "locate" to find the APK file
4. Transfer the APK to your phone and install it

---

## 🍎 Step 3B: Build for iOS (iPhone)

### Requirements:
- **Mac computer** (required for iOS development)
- **Xcode** (download from Mac App Store)
- **Apple Developer Account** ($99/year for App Store, FREE for testing on your own device)

### Steps:

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Initialize Capacitor (if not done already):**
   ```bash
   npx cap init
   ```
   - App name: `AquaMeter`
   - Package ID: `com.aquameter.app`

3. **Add iOS platform:**
   ```bash
   npx cap add ios
   ```

4. **Sync code to iOS:**
   ```bash
   npx cap sync ios
   ```

5. **Open in Xcode:**
   ```bash
   npx cap open ios
   ```

6. **In Xcode:**
   - Connect your iPhone via USB
   - Select your iPhone from the device list
   - Click **Product** → **Run** (or press Cmd+R)
   - The app will install and open on your iPhone!

### For App Store Distribution:
1. Create an account at https://developer.apple.com
2. In Xcode: **Product** → **Archive**
3. Follow Apple's submission guidelines
4. Submit to App Store for review

---

## 🔄 Step 4: Make Changes & Update

Whenever you make code changes:

```bash
# 1. Build the web app
npm run build

# 2. Sync changes to mobile platforms
npx cap sync

# 3. Open the platform you want to test
npx cap open android
# or
npx cap open ios
```

---

## 🎨 Step 5: Customize App Icons & Splash Screen

### App Icon:
1. Create a 1024x1024 PNG image
2. For Android: Place in `android/app/src/main/res/` folders
3. For iOS: Use Xcode's Asset Catalog

### Splash Screen:
1. Edit `/capacitor.config.ts` to customize colors
2. Current splash: Blue background with 2-second display
3. To add image: Place image in platform-specific folders

---

## 📋 Important Notes

### Camera Permissions:
- iOS: Automatically asks for permission
- Android: Automatically asks for permission
- Both platforms: Users can revoke permissions in device settings

### Data Storage:
- All data is stored locally on the device
- Data persists between app launches
- Uninstalling the app will delete all data

### Testing on Real Devices:
- **Android**: Enable "Developer Options" and "USB Debugging"
- **iOS**: Trust your computer when prompted
- **Both**: Keep devices unlocked during installation

---

## 🚀 Quick Commands Reference

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start website for testing in browser |
| `npm run build` | Build production version |
| `npx cap add android` | Add Android support (once) |
| `npx cap add ios` | Add iOS support (once) |
| `npx cap sync` | Update mobile apps with latest code |
| `npx cap open android` | Open in Android Studio |
| `npx cap open ios` | Open in Xcode |

---

## 🆘 Troubleshooting

### "npm is not recognized"
- Install Node.js from https://nodejs.org/

### "Android Studio not found"
- Download from https://developer.android.com/studio
- Make sure to install Android SDK

### "Xcode not found"
- Open Mac App Store and install Xcode
- Run `xcode-select --install` in terminal

### "Build failed"
- Delete `node_modules` folder
- Run `npm install` again
- Run `npm run build` again

### Camera not working
- Check device permissions in Settings
- Make sure you're testing on a real device (not simulator)

---

## 📝 For Your Teacher's Submission

### What to Include:
1. ✅ Source code (entire WaterMeter folder)
2. ✅ APK file (Android) or TestFlight link (iOS)
3. ✅ Screenshots of the app running on your phone
4. ✅ This documentation

### Demo Tips:
- Show the app running on your actual phone
- Demonstrate camera functionality
- Show real-time data updates
- Explain the difference between Daily Check and Weekly Upload

---

## 🎓 Project Features Summary

Your AquaMeter app includes:
- ✅ User authentication (register/login)
- ✅ Native camera integration for meter photos
- ✅ Daily consumption tracking (awareness only)
- ✅ Weekly uploads (official billing tracking)
- ✅ Usage history with charts
- ✅ Savings calculator
- ✅ Smart notifications for usage limits
- ✅ Settings for tariff configuration
- ✅ Comprehensive help section
- ✅ Works on iOS, Android, and web browsers

---

**Good luck with your project! 🌊💧**
