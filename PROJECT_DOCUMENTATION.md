# AquaMeter - Water Resource Management System

## Project Overview

**AquaMeter** is a comprehensive mobile and web application designed for "Optimization in Water Resource Management." The system helps users monitor their water consumption, set usage limits, track costs, and receive intelligent notifications to promote water conservation.

## 🎯 Project Goals

- Enable daily water meter monitoring for consumption awareness
- Provide weekly official tracking for billing and notifications
- Help users set and maintain monthly water usage limits
- Calculate cost savings based on consumption patterns
- Reference real water tariff rates (Richli Water, Bohol Water Utilities)
- Promote water conservation through smart notifications

## 📱 Platform Support

This application runs on:

- ✅ **Android** - Native mobile app
- ✅ **Web Browsers** - Desktop and mobile browsers

## ⚡ Key Features

### 1. User Authentication
- Secure registration and login system
- Personalized user profiles
- Welcome screen with app introduction

### 2. Dual Tracking System

#### Daily Check (Awareness Only)
- Quick daily meter photo uploads
- View day-by-day consumption patterns
- Personal awareness without official tracking
- No impact on billing or notifications

#### Weekly Upload (Official Tracking)
- Official meter readings for billing calculations
- Triggers usage limit notifications
- Used for savings computation
- Historical data for trend analysis

### 3. Dashboard
- Real-time consumption statistics
- Monthly usage progress bar
- Quick access to all features
- Personalized greeting with username
- Current month consumption vs. limit

### 4. Usage History
- Interactive charts showing consumption trends
- Filter by date range
- View all meter photos
- Detailed reading history (daily and weekly)
- Export data capability

### 5. Smart Notifications
- Automatic alerts when approaching usage limit (75%, 90%, 100%)
- Weekly reminder notifications
- Customizable notification preferences
- Native mobile notifications

### 6. Savings Calculator
- Calculate monthly savings based on consumption
- Compare with previous months
- Set savings goals
- Reference actual water tariff rates:
  - Richli Water Company rates
  - Bohol Water Utilities rates
- Estimate monthly bills

### 7. Settings
- Configure water tariff provider
- Set monthly usage limits
- Adjust notification preferences
- Account management
- Data export options

### 8. Help Section
- Complete user guide
- FAQ section
- Feature explanations
- Contact information
- Troubleshooting tips

### 9. Native Camera Integration
- Direct camera access on mobile devices
- Save photos to device gallery
- Automatic photo compression
- Fallback to file upload on web browsers

## 🛠 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React Router 7** - Navigation
- **Recharts** - Data visualization
- **Motion** (formerly Framer Motion) - Animations

### Mobile Development
- **Capacitor 6** - Native mobile app framework
- **Native Camera API** - Photo capture
- **Local Notifications API** - Push notifications
- **Status Bar API** - UI customization
- **Splash Screen API** - Launch screen

### State Management
- **React Context API** - Global state
- **Local Storage** - Data persistence

### UI Components
- **Radix UI** - Accessible components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Material-UI** - Additional components

## 📊 Data Management

### Storage
- Local storage for user data and settings
- IndexedDB for large datasets (meter photos)
- Persistent across app sessions
- No external database required

### Data Structure
```typescript
interface Reading {
  date: string;
  reading: number;
  imageUrl: string;
  type: 'daily' | 'weekly';
}

interface Settings {
  monthlyLimit: number;
  tariffProvider: string;
  notificationsEnabled: boolean;
}

interface User {
  username: string;
  email: string;
  registrationDate: string;
}
```

## 🎨 Design Principles

1. **Mobile-First**: Optimized for smartphone usage
2. **Intuitive Navigation**: Clear user flow between features
3. **Visual Feedback**: Immediate response to user actions
4. **Accessibility**: Screen reader support and high contrast
5. **Performance**: Fast load times and smooth animations

## 🔒 Privacy & Security

- All data stored locally on user's device
- No data sent to external servers
- No collection of personal information
- Camera permissions requested only when needed
- Users have full control over their data

## 📈 Future Enhancements

- Cloud backup and sync across devices
- AI-powered consumption prediction
- Integration with smart water meters
- Community water savings challenges
- Detailed analytics and insights
- Export reports to PDF

## 🎓 Educational Value

This project demonstrates:
- Real-world problem solving (water conservation)
- Full-stack mobile development skills
- User-centered design thinking
- Data visualization techniques
- Cross-platform development
- Modern web technologies

## 📝 Installation & Setup

See `MOBILE_BUILD_GUIDE.md` for complete instructions on:
- Setting up development environment
- Building for iOS and Android
- Testing on real devices
- Deploying to App Stores

## 🤝 Credits

**Developer**: Raphaella  
**Project**: Optimization in Water Resource Management  
**Institution**: [Your School/Institution]  
**Date**: March 2026

## 📄 License

This project is developed for educational purposes.

---

**For detailed build instructions, see MOBILE_BUILD_GUIDE.md**
