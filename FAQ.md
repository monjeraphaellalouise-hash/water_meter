# ❓ Frequently Asked Questions (FAQ)

## General Questions

### Q: Do I need internet to use this app?
**A:** No! The app works completely offline. All data is stored locally on your device. You only need internet to download the app initially.

### Q: Is my data safe?
**A:** Yes! All your data (photos, readings, settings) is stored only on YOUR device. Nothing is sent to any server or cloud. Your privacy is protected.

### Q: Will this work on my phone?
**A:** Yes, if you have:
- iPhone: iOS 13 or higher
- Android: Android 5.0 or higher
- Web: Any modern browser (Chrome, Safari, Firefox, Edge)

### Q: Do I need a Mac to use this app?
**A:** No! You only need a Mac if you want to BUILD the iOS version yourself. To USE the app on iPhone, you can use Option 1 (Add to Home Screen) which works on any computer.

---

## Installation Questions

### Q: How long does installation take?
**A:** 
- Web version: 2-3 minutes
- Quick demo on phone: 5 minutes
- Building Android native app: 30-60 minutes (first time)
- Building iOS native app: 30-60 minutes (first time)

### Q: Do I need to install anything special?
**A:** For web version, just Node.js. For mobile apps, you need:
- Android: Android Studio
- iOS: Xcode (Mac only)

See ENVIRONMENT_SETUP.md for details.

### Q: Can I test without building the native app?
**A:** Yes! Use the quick demo method:
```bash
npm run dev -- --host
```
Then open on your phone's browser and "Add to Home Screen"

### Q: What if npm install fails?
**A:** Try:
1. Make sure Node.js is installed
2. Delete `node_modules` folder
3. Run `npm cache clean --force`
4. Run `npm install` again

---

## Feature Questions

### Q: What's the difference between Daily Check and Weekly Upload?
**A:** 
- **Daily Check:** Personal tracking only. For your awareness. Not used for billing or notifications.
- **Weekly Upload:** Official tracking. Used for billing calculations, notifications, and savings reports.

### Q: Why do I need both Daily Check and Weekly Upload?
**A:** 
- Daily Check: See your consumption every day, build awareness
- Weekly Upload: Track official readings for your water bill
- This gives you both detailed awareness AND official tracking!

### Q: Can I delete photos after uploading?
**A:** Currently no, but photos are stored locally on your device. You can clear all data by going to Settings.

### Q: How do notifications work?
**A:** The app alerts you when:
- You reach 75% of your monthly limit
- You reach 90% of your monthly limit
- You exceed 100% of your monthly limit
- On native apps, these appear as push notifications!

### Q: Can I export my data?
**A:** The app stores data locally. Future versions may include export to CSV or PDF.

---

## Camera Questions

### Q: Why isn't the camera working?
**A:** 
1. Make sure you're testing on a REAL device (not browser on computer)
2. Check that you've granted camera permissions
3. On iOS: Settings → AquaMeter → Camera → Allow
4. On Android: Settings → Apps → AquaMeter → Permissions → Camera → Allow

### Q: Can I use photos from my gallery instead of camera?
**A:** On web browsers, yes. On native apps, the camera opens directly, but you can add gallery option in future updates.

### Q: Where are my meter photos stored?
**A:** 
- Native apps: Photos are also saved to your device's photo gallery
- All apps: Photos are stored as part of the app's local data

### Q: Do photos take up a lot of space?
**A:** Photos are compressed to reduce size. Typical photo: 200-500KB. Even 100 photos = only 20-50MB.

---

## Building & Development Questions

### Q: Can I build for iOS on Windows?
**A:** No. iOS apps can ONLY be built on Mac computers. This is an Apple requirement, not a limitation of this app.

**But you CAN:**
- Use Option 1 (Add to Home Screen) on Windows
- Build Android version on Windows
- Use web version on any computer

### Q: Do I need to pay for Apple Developer account?
**A:** 
- For testing on your own device: NO (free)
- For App Store submission: YES ($99/year)

### Q: How do I create an APK file?
**A:** 
1. Build the Android app in Android Studio
2. Go to: Build → Build Bundle(s) / APK(s) → Build APK(s)
3. Wait for build to complete
4. Click "locate" to find the APK file

### Q: Can I publish this to App Store / Play Store?
**A:** Technically yes, but you'd need:
- For iOS: Apple Developer account ($99/year)
- For Android: Google Play Developer account ($25 one-time)
- App Store compliance (privacy policy, terms, etc.)
- Proper app icons and screenshots

### Q: What if I make changes to the code?
**A:** After code changes:
```bash
npm run build
npx cap sync
```
Then reopen in Android Studio or Xcode

---

## Technical Questions

### Q: What technology is this built with?
**A:** 
- React 18 (user interface)
- TypeScript (programming language)
- Capacitor 6 (mobile framework)
- Tailwind CSS (styling)
- Vite (build tool)

### Q: Can I add more features?
**A:** Yes! The code is well-organized. See ARCHITECTURE.md to understand the structure.

### Q: Does this use a database?
**A:** No external database. Everything is stored locally using browser's Local Storage API.

### Q: Can multiple users use the same device?
**A:** Currently no. The app stores one user's data per device. Future versions could add multi-user support.

### Q: Can I sync data across devices?
**A:** Currently no. Each device has its own data. Future versions could add cloud sync with Supabase or Firebase.

---

## Usage Questions

### Q: How often should I do Daily Checks?
**A:** As often as you like! Daily is recommended for best awareness, but you can do it weekly or whenever you want.

### Q: How often should I do Weekly Uploads?
**A:** Once per week is recommended. This gives you 4 official readings per month for accurate billing.

### Q: What if I forget to upload?
**A:** The app stores your data, so you can add readings anytime. You can backdate readings if needed.

### Q: Can I edit or delete readings?
**A:** Currently no. Once added, readings are permanent. This ensures data integrity for billing purposes.

### Q: What are the water tariff rates based on?
**A:** Real rates from:
- Richli Water Company
- Bohol Water Utilities Inc.
You can see the actual rates in the Savings calculator.

### Q: How accurate is the savings calculator?
**A:** Very accurate! It uses real tariff rates and your actual consumption data.

---

## Troubleshooting Questions

### Q: The app won't start. What do I do?
**A:** 
1. Clear browser cache
2. Make sure `npm install` completed successfully
3. Try `npm run build` then `npm run dev`
4. Check console for error messages

### Q: My phone won't connect to the dev server
**A:** 
1. Make sure both devices are on SAME Wi-Fi
2. Turn off VPN if you're using one
3. Check firewall settings
4. Try the IP address shown in terminal

### Q: Build failed with Capacitor error
**A:** 
1. Make sure you ran `npm run build` first
2. Try `npx cap sync` again
3. Delete android/ios folders and re-add platform
4. Check that Android Studio/Xcode is properly installed

### Q: "Permission denied" error on Mac
**A:** 
Try using `sudo`:
```bash
sudo npm install -g @capacitor/cli
```

### Q: Android Studio won't recognize my device
**A:** 
1. Enable USB Debugging on phone
2. Try a different USB cable
3. Install device drivers (Windows)
4. Accept "Allow USB Debugging" popup on phone

### Q: Xcode says "No devices found"
**A:** 
1. Connect iPhone with cable
2. Trust computer on iPhone
3. Keep iPhone unlocked during installation
4. Select your device from device dropdown

---

## Performance Questions

### Q: Why is the app slow?
**A:** 
- First load is always slower
- Many photos stored? App loads all on startup
- Try clearing old data in Settings
- Web version is slower than native apps

### Q: Does this drain battery?
**A:** No! The app only uses battery when actively open. Notifications use minimal battery.

### Q: How much storage does it use?
**A:** 
- App itself: ~5-10 MB
- Data: Depends on how many photos (200-500KB each)
- 100 readings with photos: ~50-75 MB

---

## Project & Academic Questions

### Q: Can I use this for my own project?
**A:** Yes! It's built for educational purposes.

### Q: Can I modify the code?
**A:** Yes! All code is yours to modify and learn from.

### Q: What should I include in my project report?
**A:** See PROJECT_DOCUMENTATION.md for a complete guide.

### Q: How do I explain this to my teacher?
**A:** Focus on:
1. Problem: Water management is important
2. Solution: Dual tracking system (daily + weekly)
3. Technology: Modern cross-platform development
4. Impact: Helps conserve water and save money

### Q: What makes this project special?
**A:** 
- Real-world problem solving
- Cross-platform (iOS, Android, Web)
- Native mobile features (camera, notifications)
- Modern technology stack
- Environmental impact
- User-centered design

---

## Future Enhancement Questions

### Q: What features could be added?
**A:** Ideas:
- Cloud backup and sync
- AI consumption predictions
- Smart meter integration
- Family/household tracking
- Water quality tracking
- Community challenges
- Export to PDF/Excel
- Multi-language support
- Dark mode
- Widget support

### Q: Can this work with smart water meters?
**A:** Not currently, but could be added! Would need:
- Bluetooth or WiFi integration
- Smart meter API
- Automatic reading capture

### Q: Could this include water quality data?
**A:** Great idea! Could add:
- pH levels
- TDS (Total Dissolved Solids)
- Hardness
- Chlorine levels
- Temperature

---

## License & Legal Questions

### Q: Can I sell this app?
**A:** The code is yours to use. If publishing:
- Change app name and branding
- Add your own privacy policy
- Comply with App Store/Play Store guidelines
- Consider any open-source licenses of included libraries

### Q: Do I need terms of service / privacy policy?
**A:** 
- For personal use: No
- For App Store submission: Yes
- For school project: No

### Q: Is there a warranty?
**A:** This is an educational project with no warranty. Use at your own risk.

---

## Contact & Support Questions

### Q: Who do I contact for help?
**A:** 
1. Check all documentation files
2. Google your specific error
3. Check Capacitor docs: https://capacitorjs.com
4. Check React docs: https://react.dev
5. Stack Overflow community

### Q: Can I contribute improvements?
**A:** Yes! This is your project. Make it better!

### Q: Where can I learn more about the technologies used?
**A:** 
- React: https://react.dev/learn
- Capacitor: https://capacitorjs.com/docs
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs

---

## Quick Answers

**"Can I use this on my iPhone?"** → Yes

**"Do I need a Mac?"** → Only to BUILD for iOS, not to USE on iPhone

**"Is it free?"** → Yes, all development tools are free

**"Does it work offline?"** → Yes, completely

**"Is my data private?"** → Yes, stored only on your device

**"Can I share my APK with friends?"** → Yes

**"How long to set up?"** → 5 minutes for quick demo, 1 hour for native apps

**"Do I need coding knowledge?"** → To USE: No. To MODIFY: Basic React knowledge helps

---

## Still Have Questions?

1. Read START_HERE.md
2. Check QUICK_START_GUIDE.md
3. See MOBILE_BUILD_GUIDE.md
4. Review ARCHITECTURE.md
5. Google your question
6. Ask your teacher/mentor

**Good luck! 🌊💧**
