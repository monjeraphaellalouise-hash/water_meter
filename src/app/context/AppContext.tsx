import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface MeterReading {
  id: string;
  date: string;
  reading: number; // cubic meters
  imageUrl: string;
  type: 'daily' | 'weekly';
  consumption?: number; // difference from previous reading
}

export interface NotificationItem {
  id: string;
  type: 'reminder' | 'warning' | 'alert';
  message: string;
  date: string;
  read: boolean;
}

export interface UserSettings {
  monthlyLimit: number; // cubic meters
  tariffRate: number; // cost per cubic meter
  waterProvider: string;
  enableNotifications: boolean;
}

interface AppContextType {
  // User
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  isLoading: boolean; // Add loading state
  
  // Readings
  readings: MeterReading[];
  addReading: (reading: Omit<MeterReading, 'id' | 'consumption'>) => void;
  deleteReading: (id: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  checkWeeklyUploadReminder: () => void;
  
  // Settings
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  clearAllData: () => void;
  
  // Calculations
  getCurrentMonthUsage: () => number;
  getMonthlyBill: () => number;
  getMonthlySavings: () => { waterSaved: number; moneySaved: number };
  getDailyConsumption: (date: string) => number;
  getLastWeeklyReading: () => MeterReading | null;
  getDaysSinceLastWeeklyUpload: () => number;
  
  // 🆕 4-Week Billing Cycle Functions
  getCurrentCycleWeek: () => number; // Returns 1-4
  getCurrentCycleReadings: () => MeterReading[];
  getCurrentCycleUsage: () => number;
  getCurrentCycleBill: () => number;
  getAllBillingCycles: () => BillingCycle[];
}

// 🆕 Billing Cycle Type
export interface BillingCycle {
  cycleNumber: number;
  startDate: string;
  endDate: string;
  readings: MeterReading[];
  usage: number; // Week 4 reading - Week 1 reading
  bill: number;
  isComplete: boolean; // Has 4 weeks
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    monthlyLimit: 30,
    tariffRate: 25,
    waterProvider: 'Richli Water',
    enableNotifications: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as true

  // Load data from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    
    const savedUser = localStorage.getItem('aquameter_user');
    const savedReadings = localStorage.getItem('aquameter_readings');
    const savedNotifications = localStorage.getItem('aquameter_notifications');
    const savedSettings = localStorage.getItem('aquameter_settings');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedReadings) setReadings(JSON.parse(savedReadings));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    
    // Finished loading
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (user) localStorage.setItem('aquameter_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('aquameter_readings', JSON.stringify(readings));
  }, [readings]);

  useEffect(() => {
    localStorage.setItem('aquameter_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('aquameter_settings', JSON.stringify(settings));
  }, [settings]);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    // Retrieve registered user from localStorage
    const savedUsers = localStorage.getItem('aquameter_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Find user by email
    const existingUser = users.find((u: { email: string }) => u.email === email);
    
    if (existingUser) {
      setUser({ name: existingUser.name, email: existingUser.email });
    } else {
      // If user not found, still log in with email (for demo purposes)
      setUser({ name: 'User', email });
    }
    setIsLoading(false);
  };

  const register = (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Get existing users from localStorage
    const savedUsers = localStorage.getItem('aquameter_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    
    // Save back to localStorage
    localStorage.setItem('aquameter_users', JSON.stringify(users));
    
    // Set current user
    setUser({ name, email });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aquameter_user');
  };

  const clearAllData = () => {
    // Clear all app data
    setReadings([]);
    setNotifications([]);
    setSettings({
      monthlyLimit: 30,
      tariffRate: 25,
      waterProvider: 'Richli Water',
      enableNotifications: true,
    });
    
    // Clear localStorage
    localStorage.removeItem('aquameter_readings');
    localStorage.removeItem('aquameter_notifications');
    localStorage.removeItem('aquameter_settings');
  };

  const addReading = (reading: Omit<MeterReading, 'id' | 'consumption'>) => {
    const id = Date.now().toString();
    
    // Calculate consumption based on previous reading
    let consumption = 0;
    if (reading.type === 'daily') {
      // Find previous day's reading
      const prevReading = readings
        .filter(r => r.type === 'daily')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      
      if (prevReading) {
        consumption = reading.reading - prevReading.reading;
      }
    } else {
      // Weekly - find previous week's reading
      const prevReading = readings
        .filter(r => r.type === 'weekly')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      
      if (prevReading) {
        consumption = reading.reading - prevReading.reading;
      }
    }

    const newReading: MeterReading = {
      ...reading,
      id,
      consumption,
    };

    setReadings([...readings, newReading]);

    // Check if need to send notifications for weekly readings
    if (reading.type === 'weekly' && settings.enableNotifications) {
      // Get all weekly readings sorted by date
      const allWeeklyReadings = [...readings, newReading]
        .filter(r => r.type === 'weekly')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Determine current cycle: group readings into sets of 4
      const currentCycleStart = Math.floor((allWeeklyReadings.length - 1) / 4) * 4;
      const currentCycleReadings = allWeeklyReadings.slice(currentCycleStart);
      const weekInCycle = currentCycleReadings.length; // 1, 2, 3, or 4

      // Calculate usage in current cycle
      let cycleUsage = 0;
      if (currentCycleReadings.length >= 2) {
        const firstReading = currentCycleReadings[0].reading;
        const lastReading = currentCycleReadings[currentCycleReadings.length - 1].reading;
        cycleUsage = lastReading - firstReading;
      }

      // Send notifications based on progress
      if (weekInCycle === 4) {
        // 🎉 Cycle complete! Check if they stayed within limit
        const cycleBill = cycleUsage * settings.tariffRate;

        if (cycleUsage <= settings.monthlyLimit) {
          // Success!
          const waterSaved = settings.monthlyLimit - cycleUsage;
          const moneySaved = waterSaved * settings.tariffRate;
          const cycleNumber = Math.floor(allWeeklyReadings.length / 4);

          addNotification({
            type: 'reminder',
            message: `🎉 Congratulations! You completed 4-Week Billing Cycle #${cycleNumber} within your limit! 💧 Water Used: ${cycleUsage.toFixed(1)} m³ | 💰 Bill: ₱${cycleBill.toFixed(2)} | ✨ You Saved: ₱${moneySaved.toFixed(2)}`,
            date: new Date().toISOString(),
          });
        } else {
          // Exceeded limit
          addNotification({
            type: 'alert',
            message: `⚠️ Cycle #${Math.floor(allWeeklyReadings.length / 4)} limit exceeded! You've used ${cycleUsage.toFixed(1)} m³ out of ${settings.monthlyLimit} m³. Bill: ₱${cycleBill.toFixed(2)}`,
            date: new Date().toISOString(),
          });
        }
      } else if (weekInCycle === 3 && cycleUsage >= settings.monthlyLimit * 0.8) {
        // Week 3: Warning if approaching limit
        addNotification({
          type: 'warning',
          message: `⚡ Week 3 Warning: You're approaching your limit! Current usage: ${cycleUsage.toFixed(1)} m³ / ${settings.monthlyLimit} m³. You have 1 more week left.`,
          date: new Date().toISOString(),
        });
      }
    }
  };

  const deleteReading = (id: string) => {
    setReadings(readings.filter(r => r.id !== id));
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: Date.now().toString(),
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  const getCurrentMonthUsage = (): number => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Get all weekly readings for current month, sorted by date
    const monthlyReadings = readings
      .filter(r => {
        const readingDate = new Date(r.date);
        return (
          r.type === 'weekly' &&
          readingDate.getMonth() === currentMonth &&
          readingDate.getFullYear() === currentYear
        );
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // If no readings this month, return 0
    if (monthlyReadings.length === 0) return 0;
    
    // If only one reading, it's the baseline (no consumption yet)
    if (monthlyReadings.length === 1) return 0;

    // ✅ CORRECT FORMULA: Last reading - First reading of the month
    const firstReading = monthlyReadings[0].reading;
    const lastReading = monthlyReadings[monthlyReadings.length - 1].reading;
    
    return lastReading - firstReading;
  };

  const getMonthlyBill = (): number => {
    const usage = getCurrentMonthUsage();
    return usage * settings.tariffRate;
  };

  const getMonthlySavings = () => {
    const currentUsage = getCurrentMonthUsage();
    const limit = settings.monthlyLimit;
    
    if (currentUsage < limit) {
      const waterSaved = limit - currentUsage;
      const moneySaved = waterSaved * settings.tariffRate;
      return { waterSaved, moneySaved };
    }
    
    return { waterSaved: 0, moneySaved: 0 };
  };

  const getDailyConsumption = (date: string): number => {
    const reading = readings.find(r => r.type === 'daily' && r.date === date);
    return reading?.consumption || 0;
  };

  const getLastWeeklyReading = (): MeterReading | null => {
    const weeklyReadings = readings
      .filter(r => r.type === 'weekly')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return weeklyReadings.length > 0 ? weeklyReadings[0] : null;
  };

  const getDaysSinceLastWeeklyUpload = (): number => {
    const lastReading = getLastWeeklyReading();
    if (!lastReading) return 0;

    const lastReadingDate = new Date(lastReading.date);
    const now = new Date();
    const timeDifference = now.getTime() - lastReadingDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    return Math.floor(dayDifference);
  };

  // 🆕 4-Week Billing Cycle Functions
  const getCurrentCycleWeek = (): number => {
    const weeklyReadings = readings
      .filter(r => r.type === 'weekly')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (weeklyReadings.length === 0) return 0;

    // Calculate which week in the current cycle (1-4)
    const weekInCycle = ((weeklyReadings.length - 1) % 4) + 1;
    return weekInCycle;
  };

  const getCurrentCycleReadings = (): MeterReading[] => {
    const weeklyReadings = readings
      .filter(r => r.type === 'weekly')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (weeklyReadings.length === 0) return [];

    // Get current cycle: last 1-4 readings
    const currentCycleStart = Math.floor((weeklyReadings.length - 1) / 4) * 4;
    return weeklyReadings.slice(currentCycleStart);
  };

  const getCurrentCycleUsage = (): number => {
    const cycleReadings = getCurrentCycleReadings();
    
    if (cycleReadings.length < 2) return 0;

    // Usage = Last reading - First reading in cycle
    const firstReading = cycleReadings[0].reading;
    const lastReading = cycleReadings[cycleReadings.length - 1].reading;
    
    return lastReading - firstReading;
  };

  const getCurrentCycleBill = (): number => {
    const usage = getCurrentCycleUsage();
    return usage * settings.tariffRate;
  };

  const getAllBillingCycles = (): BillingCycle[] => {
    const weeklyReadings = readings
      .filter(r => r.type === 'weekly')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const cycles: BillingCycle[] = [];

    // Group readings into sets of 4
    for (let i = 0; i < weeklyReadings.length; i += 4) {
      const cycleReadings = weeklyReadings.slice(i, i + 4);
      const isComplete = cycleReadings.length === 4;

      let usage = 0;
      if (cycleReadings.length >= 2) {
        usage = cycleReadings[cycleReadings.length - 1].reading - cycleReadings[0].reading;
      }

      cycles.push({
        cycleNumber: Math.floor(i / 4) + 1,
        startDate: cycleReadings[0].date,
        endDate: cycleReadings[cycleReadings.length - 1].date,
        readings: cycleReadings,
        usage,
        bill: usage * settings.tariffRate,
        isComplete,
      });
    }

    return cycles;
  };

  const checkWeeklyUploadReminder = () => {
    if (!settings.enableNotifications) return;
    
    const daysSinceLastUpload = getDaysSinceLastWeeklyUpload();
    if (daysSinceLastUpload < 7) return;

    // Check if we already sent a reminder for this period
    const recentReminder = notifications.find(
      n => n.type === 'reminder' && 
      n.message.includes('Weekly reading upload reminder') &&
      (new Date().getTime() - new Date(n.date).getTime()) < 24 * 3600 * 1000 // within last 24 hours
    );

    if (!recentReminder) {
      addNotification({
        type: 'reminder',
        message: `🔔 Weekly reading upload reminder! It's been ${daysSinceLastUpload} days since your last upload. Please upload your meter reading.`,
        date: new Date().toISOString(),
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        readings,
        addReading,
        deleteReading,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        checkWeeklyUploadReminder,
        settings,
        updateSettings,
        clearAllData,
        getCurrentMonthUsage,
        getMonthlyBill,
        getMonthlySavings,
        getDailyConsumption,
        getLastWeeklyReading,
        getDaysSinceLastWeeklyUpload,
        getCurrentCycleWeek,
        getCurrentCycleReadings,
        getCurrentCycleUsage,
        getCurrentCycleBill,
        getAllBillingCycles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};