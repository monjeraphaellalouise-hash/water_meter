import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aquameter.app',
  appName: 'AquaMeter',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small"
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: "#3B82F6"
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#3B82F6",
      sound: "beep.wav"
    },
    Camera: {
      saveToGallery: false,
      allowEditing: false,
      source: 'prompt',
      resultType: 'dataUrl'
    }
  }
};

export default config;