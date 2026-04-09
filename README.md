# AquaMeter - Water Resource Management System

A comprehensive mobile and web application for water meter monitoring and conservation.

## 🚀 Quick Start

### For Testing (Web Version):
```bash
npm install
npm run dev
```
Then open http://localhost:5173

### For Mobile Demo:
```bash
npm install
npm run dev -- --host
```
Then open the Network address on your phone.

## 📱 Building Mobile Apps

See **START_HERE.md** for complete instructions!

### Quick Build Commands:

**Android:**
```bash
npm run build
npx cap add android
npx cap open android
```

**iOS (Mac only):**
```bash
npm run build
npx cap add ios
npx cap open ios
```

## 📖 Documentation

- **START_HERE.md** - Read this first!
- **QUICK_START_GUIDE.md** - Fastest way to demo
- **MOBILE_BUILD_GUIDE.md** - Complete build instructions
- **PROJECT_DOCUMENTATION.md** - For teacher submission

## 🎯 Features

- User authentication
- Daily water consumption tracking
- Weekly official readings for billing
- Usage history with charts
- Smart notifications
- Savings calculator
- Native camera support
- Cross-platform (iOS, Android, Web)

## 🛠 Technology

- React 18 + TypeScript
- Capacitor 6 (Mobile)
- Tailwind CSS 4
- React Router 7
- Recharts (Data visualization)

## 📦 Project Structure

```
WaterMeter/
├── src/
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── context/        # State management
│   │   └── utils/          # Helper functions
│   └── styles/             # CSS files
├── android/                # Android native code (after build)
├── ios/                    # iOS native code (after build)
├── public/                 # Static assets
└── Documentation files
```

## 👨‍💻 Developer

Raphaella  
Project: Optimization in Water Resource Management

## 📄 License

Educational project - March 2026

---

**Need help? Check START_HERE.md or QUICK_START_GUIDE.md**