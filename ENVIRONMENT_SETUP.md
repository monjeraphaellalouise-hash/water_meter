# 🔧 Environment Setup Guide

This guide helps you set up your development environment for AquaMeter.

---

## 📋 Prerequisites

### Required Software:

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`
   - Should show: v18.x.x or higher

2. **npm** (comes with Node.js)
   - Verify: `npm --version`
   - Should show: 9.x.x or higher

3. **Git** (optional, for version control)
   - Download: https://git-scm.com/
   - Verify: `git --version`

---

## 🖥️ For Web Development Only

If you only want to run the web version:

### Windows:
1. Install Node.js from https://nodejs.org/
2. Open PowerShell or Command Prompt
3. Navigate to project folder
4. Run: `npm install`
5. Run: `npm run dev`

### Mac:
1. Install Node.js from https://nodejs.org/
2. Open Terminal
3. Navigate to project folder
4. Run: `npm install`
5. Run: `npm run dev`

### Linux:
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Navigate to project
cd /path/to/WaterMeter

# Install and run
npm install
npm run dev
```

---

## 📱 For Android Development

### Windows, Mac, or Linux:

1. **Install Java JDK 11 or higher**
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Or use OpenJDK: https://adoptium.net/
   - Verify: `java --version`

2. **Install Android Studio**
   - Download: https://developer.android.com/studio
   - During installation, also install:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (optional)

3. **Configure Android SDK**
   - Open Android Studio
   - Go to: Tools → SDK Manager
   - Install:
     - Android SDK Platform 33 (or latest)
     - Android SDK Build-Tools
     - Android SDK Command-line Tools

4. **Set Environment Variables**

   **Windows:**
   ```powershell
   # Add to System Environment Variables:
   ANDROID_HOME = C:\Users\YourName\AppData\Local\Android\Sdk
   
   # Add to Path:
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   ```

   **Mac/Linux:**
   ```bash
   # Add to ~/.bash_profile or ~/.zshrc
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

5. **Enable USB Debugging on Phone**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

---

## 🍎 For iOS Development

### Requirements:
- **Mac computer** (required - cannot build iOS on Windows/Linux)
- **macOS** 12.0 or higher

### Steps:

1. **Install Xcode**
   - Open Mac App Store
   - Search for "Xcode"
   - Click "Get" (it's free but large - 10-15 GB)
   - Wait for download and installation

2. **Install Xcode Command Line Tools**
   ```bash
   xcode-select --install
   ```

3. **Accept Xcode License**
   ```bash
   sudo xcodebuild -license accept
   ```

4. **Install CocoaPods** (iOS dependency manager)
   ```bash
   sudo gem install cocoapods
   ```

5. **Setup Apple Developer Account** (optional for testing)
   - Free account: Test on your own device
   - Paid ($99/year): Submit to App Store

---

## 🚀 Quick Setup Commands

### First Time Setup:

```bash
# 1. Navigate to project folder
cd /path/to/WaterMeter

# 2. Install all npm packages
npm install

# 3. Build the web app
npm run build

# 4. Add mobile platforms (choose what you need)
npx cap add android    # For Android
npx cap add ios        # For iOS (Mac only)

# 5. Sync code to platforms
npx cap sync

# 6. Open in IDE
npx cap open android   # Opens Android Studio
npx cap open ios       # Opens Xcode (Mac only)
```

---

## ✅ Verify Your Setup

### Check Node.js:
```bash
node --version
# Should show: v18.x.x or higher
```

### Check npm:
```bash
npm --version
# Should show: 9.x.x or higher
```

### Check Java (for Android):
```bash
java --version
# Should show: version 11 or higher
```

### Check Android SDK (for Android):
```bash
# Windows
echo %ANDROID_HOME%

# Mac/Linux
echo $ANDROID_HOME

# Should show SDK path
```

### Check Xcode (for iOS, Mac only):
```bash
xcodebuild -version
# Should show Xcode version
```

---

## 🔧 Common Setup Issues

### Issue: "npm is not recognized"
**Solution:**
- Node.js not installed or not in PATH
- Restart terminal after installing Node.js
- Reinstall Node.js

### Issue: "Java not found"
**Solution:**
- Install Java JDK
- Set JAVA_HOME environment variable
- Add Java to PATH

### Issue: "Android SDK not found"
**Solution:**
- Install Android Studio
- Open Android Studio and install SDK
- Set ANDROID_HOME environment variable

### Issue: "Command Line Tools not found" (Mac)
**Solution:**
```bash
xcode-select --install
```

### Issue: "Permission denied" (Mac/Linux)
**Solution:**
- Use `sudo` for global installations
- Or use `nvm` to manage Node.js versions

### Issue: PowerShell execution policy error (Windows)
**Solution:**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 📱 Testing Without Building

### Quick Web Test:
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Quick Mobile Test (No build needed):
```bash
npm install
npm run dev -- --host
# Open Network address on phone browser
# Add to Home Screen
```

---

## 🎓 Recommended IDE Setup

### Visual Studio Code (Recommended):
1. Install from: https://code.visualstudio.com/
2. Install extensions:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)
   - Prettier - Code formatter
   - ESLint

### Android Studio (For Android):
- Automatically installed with Android development tools
- Used for building and running Android apps

### Xcode (For iOS):
- Automatically installed from Mac App Store
- Used for building and running iOS apps

---

## 💡 Pro Tips

### Faster npm installs:
```bash
# Use pnpm (faster alternative to npm)
npm install -g pnpm
pnpm install
```

### Keep packages updated:
```bash
# Check for updates
npm outdated

# Update all packages
npm update
```

### Clear cache if issues:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Search the error on Google
3. Check Stack Overflow
4. Read the official documentation:
   - Node.js: https://nodejs.org/docs/
   - Capacitor: https://capacitorjs.com/docs
   - React: https://react.dev/
   - Android: https://developer.android.com/
   - iOS: https://developer.apple.com/

---

## ✅ Ready to Start!

Once you have:
- ✅ Node.js installed
- ✅ npm working
- ✅ (Optional) Android Studio for Android
- ✅ (Optional) Xcode for iOS

You're ready to:
1. Run `npm install`
2. Follow QUICK_START_GUIDE.md
3. Build your apps!

**Good luck! 🚀**
