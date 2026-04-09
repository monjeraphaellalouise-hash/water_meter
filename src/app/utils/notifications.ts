import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export const isNative = () => {
  return Capacitor.isNativePlatform();
};

export const scheduleNotification = async (
  title: string,
  body: string,
  scheduledTime?: Date
) => {
  if (!isNative()) {
    // Fallback to web notifications
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
    return;
  }

  try {
    // Request permissions first
    const permission = await LocalNotifications.requestPermissions();
    
    if (permission.display === 'granted') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: Date.now(),
            schedule: scheduledTime ? { at: scheduledTime } : undefined,
            sound: 'beep.wav',
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
    }
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const requestNotificationPermission = async () => {
  if (isNative()) {
    const permission = await LocalNotifications.requestPermissions();
    return permission.display === 'granted';
  } else {
    // Web notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }
};
