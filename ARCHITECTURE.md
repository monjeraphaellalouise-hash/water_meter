# 🏗️ AquaMeter Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                           │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Welcome  │  │  Login   │  │ Register │  │Dashboard │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Daily   │  │  Weekly  │  │  Usage   │  │  Savings │   │
│  │  Check   │  │  Upload  │  │ History  │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Notify  │  │ Settings │  │   Help   │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT                           │
│                   (React Context)                            │
│                                                              │
│  • User Authentication                                       │
│  • Readings Data (Daily & Weekly)                           │
│  • Settings & Preferences                                    │
│  • Notifications Queue                                       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              NATIVE DEVICE FEATURES                          │
│                  (Capacitor APIs)                            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Camera  │  │  Local   │  │  Status  │  │  Splash  │   │
│  │   API    │  │  Notify  │  │   Bar    │  │  Screen  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATA STORAGE                               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │           Local Storage (Browser/Device)            │     │
│  │                                                     │     │
│  │  • User Profile                                     │     │
│  │  • Meter Readings (Daily & Weekly)                 │     │
│  │  • Photos (Base64 encoded)                         │     │
│  │  • Settings & Preferences                          │     │
│  │  • Notification History                            │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. User Takes Photo (Daily Check or Weekly Upload)

```
User taps "Take Photo"
    ↓
App checks if native platform
    ↓
┌─────────────┬─────────────┐
│   Mobile    │     Web     │
└─────────────┴─────────────┘
    ↓               ↓
Capacitor      File Input
Camera API     (fallback)
    ↓               ↓
Permission     User selects
requested      from gallery
    ↓               ↓
Camera opens   File uploaded
    ↓               ↓
Photo taken    Converted to
    ↓          Base64
Saved to       ↓
gallery        Preview shown
    ↓               ↓
Converted to   ←────┘
Base64
    ↓
Photo stored in state
    ↓
User enters meter reading
    ↓
Validation checks
    ↓
Data saved to Local Storage
    ↓
Success notification shown
```

---

## Component Hierarchy

```
App.tsx (Root)
├── BrowserRouter
│   └── AppProvider (Context)
│       └── AppRoutes
│           ├── Welcome
│           ├── Login
│           ├── Register
│           └── Protected Routes
│               ├── Dashboard
│               ├── DailyCheck
│               │   └── Camera Component
│               ├── WeeklyUpload
│               │   └── Camera Component
│               ├── UsageHistory
│               │   └── Chart Component
│               ├── Notifications
│               ├── Savings
│               │   └── Calculator Component
│               ├── Settings
│               ├── Help
│               └── Wireframe
└── BottomNav (Always visible)
└── Toaster (Notifications)
```

---

## Dual Tracking System

### Daily Check Flow
```
┌──────────────────────────────────────┐
│         DAILY CHECK                  │
│                                      │
│  Purpose: Personal Awareness Only   │
│                                      │
│  ┌────────────────────────────┐     │
│  │ 1. User takes meter photo  │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 2. Enters current reading  │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 3. System calculates       │     │
│  │    daily consumption       │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 4. Stored as 'daily' type  │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ✗ NOT used for billing             │
│  ✗ NOT used for notifications       │
│  ✓ Shows in history                 │
│  ✓ Personal tracking only           │
└──────────────────────────────────────┘
```

### Weekly Upload Flow
```
┌──────────────────────────────────────┐
│        WEEKLY UPLOAD                 │
│                                      │
│  Purpose: Official Billing Tracking │
│                                      │
│  ┌────────────────────────────┐     │
│  │ 1. User takes meter photo  │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 2. Enters current reading  │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 3. System calculates       │     │
│  │    weekly consumption      │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 4. Checks monthly limit    │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 5. Shows projection warning│     │
│  │    if exceeding limit      │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ┌────────────────────────────┐     │
│  │ 6. Stored as 'weekly' type │     │
│  └────────────────────────────┘     │
│              ↓                       │
│  ✓ USED for billing calculation     │
│  ✓ USED for notifications           │
│  ✓ USED for savings computation     │
│  ✓ Shows in history                 │
└──────────────────────────────────────┘
```

---

## Notification System

```
Weekly Upload Added
    ↓
Calculate monthly total
    ↓
Compare with limit
    ↓
┌──────────────────────────┐
│   Usage < 75% of limit   │ → No notification
└──────────────────────────┘

┌──────────────────────────┐
│   Usage ≥ 75% of limit   │ → ⚠️  "Approaching limit"
└──────────────────────────┘

┌──────────────────────────┐
│   Usage ≥ 90% of limit   │ → ⚠️  "Near your limit!"
└──────────────────────────┘

┌──────────────────────────┐
│   Usage ≥ 100% of limit  │ → 🚨 "Limit exceeded!"
└──────────────────────────┘
    ↓
Store in notifications
    ↓
Show in Notifications screen
    ↓
If native app → Push notification
```

---

## Platform Detection

```
App Starts
    ↓
Check Capacitor.isNativePlatform()
    ↓
┌─────────────┬─────────────┐
│   Mobile    │   Browser   │
│   (TRUE)    │   (FALSE)   │
└─────────────┴─────────────┘
    ↓               ↓
Use native      Use web
features:       fallbacks:
• Camera API    • File input
• Push notify   • Web notify
• Status bar    • No status bar
• Splash        • No splash
    ↓               ↓
    └───────┬───────┘
            ↓
    Same React code
    Same UI/UX
    Same features
```

---

## Build Process

```
Developer makes changes
    ↓
npm run build
    ↓
Vite builds React app
    ↓
Output: dist/ folder
    ↓
npx cap sync
    ↓
┌─────────────┬─────────────┐
│   Android   │     iOS     │
└─────────────┴─────────────┘
    ↓               ↓
Copies dist/    Copies dist/
to android/     to ios/
    ↓               ↓
Android         Xcode
Studio          project
project         updated
updated             ↓
    ↓          Open in Xcode
Open in         ↓
Android         Build for
Studio          iOS device
    ↓               ↓
Build APK       Build IPA
    ↓               ↓
Install on      Install on
Android         iPhone
device          device
```

---

## Technology Stack Visual

```
┌─────────────────────────────────────┐
│         PRESENTATION LAYER          │
│                                     │
│  React 18 + TypeScript              │
│  React Router 7                     │
│  Tailwind CSS 4                     │
│  Material-UI / Radix UI             │
│  Lucide Icons                       │
│  Motion (Animations)                │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│         APPLICATION LAYER           │
│                                     │
│  React Context (State)              │
│  Custom Hooks                       │
│  Utility Functions                  │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│         NATIVE BRIDGE               │
│                                     │
│  Capacitor 6                        │
│  • Camera Plugin                    │
│  • Local Notifications              │
│  • Status Bar                       │
│  • Splash Screen                    │
│  • App Plugin                       │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│         NATIVE LAYER                │
│                                     │
│  iOS (Swift/Objective-C)            │
│  Android (Java/Kotlin)              │
│  Web (Browser APIs)                 │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│         DEVICE HARDWARE             │
│                                     │
│  Camera                             │
│  Storage                            │
│  Display                            │
│  Notification System                │
└─────────────────────────────────────┘
```

---

## File Structure

```
WaterMeter/
│
├── 📄 index.html                 # App entry point
├── 📄 package.json               # Dependencies
├── 📄 capacitor.config.ts        # Mobile configuration
├── 📄 vite.config.ts             # Build configuration
│
├── 📁 src/
│   ├── 📄 main.tsx               # React entry point
│   │
│   ├── 📁 app/
│   │   ├── 📄 App.tsx            # Root component
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── Welcome.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── DailyCheck.tsx
│   │   │   ├── WeeklyUpload.tsx
│   │   │   ├── UsageHistory.tsx
│   │   │   ├── Notifications.tsx
│   │   │   ├── Savings.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── Help.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── 📁 ui/          # Reusable UI components
│   │   │
│   │   ├── 📁 context/
│   │   │   └── AppContext.tsx   # Global state
│   │   │
│   │   └── 📁 utils/
│   │       ├── camera.ts         # Camera functions
│   │       └── notifications.ts  # Notification functions
│   │
│   └── 📁 styles/
│       ├── index.css
│       ├── tailwind.css
│       ├── theme.css
│       └── fonts.css
│
├── 📁 public/
│   └── manifest.json             # PWA manifest
│
├── 📁 android/                   # Android native code (after build)
├── 📁 ios/                       # iOS native code (after build)
├── 📁 dist/                      # Build output
│
└── 📁 Documentation/
    ├── START_HERE.md
    ├── QUICK_START_GUIDE.md
    ├── MOBILE_BUILD_GUIDE.md
    ├── PROJECT_DOCUMENTATION.md
    ├── CHECKLIST.md
    └── ARCHITECTURE.md (this file)
```

---

## Key Concepts

### 1. **Single Page Application (SPA)**
- All routes handled client-side
- No page reloads
- Fast navigation
- Smooth transitions

### 2. **Context API for State**
- Global state management
- No external libraries needed
- Simple and effective
- Persistent via Local Storage

### 3. **Capacitor Bridge**
- Connects web code to native features
- Same codebase, multiple platforms
- Plugin-based architecture
- Easy to extend

### 4. **Progressive Web App (PWA)**
- Works offline (limited)
- Installable on home screen
- App-like experience in browser
- Falls back gracefully

### 5. **Mobile-First Design**
- Optimized for phone screens
- Touch-friendly interfaces
- Responsive layouts
- Native-feeling interactions

---

This architecture ensures:
- ✅ Maintainability
- ✅ Scalability
- ✅ Cross-platform compatibility
- ✅ Performance
- ✅ User experience
