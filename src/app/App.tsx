import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { AppProvider, useApp } from './context/AppContext';
import { Toaster } from './components/ui/sonner';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { DailyCheck } from './components/DailyCheck';
import { WeeklyUpload } from './components/WeeklyUpload';
import { UsageHistory } from './components/UsageHistory';
import { Notifications } from './components/Notifications';
import { Savings } from './components/Savings';
import { Settings } from './components/Settings';
import { BottomNav } from './components/BottomNav';
import { SampleDataLoader } from './components/SampleDataLoader';
import { Help } from './components/Help';
import { Wireframe } from './components/Wireframe';

// ✅ Move ProtectedRoute inside a component that has access to AppProvider
function AppRoutes() {
  // ProtectedRoute defined here so it has access to AppProvider context
  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useApp();
    
    // Wait for localStorage to load before checking authentication
    if (isLoading) {
      return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
          <div className="text-white text-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Loading AquaMeter...</p>
          </div>
        </div>
      );
    }
    
    return user ? <>{children}</> : <Navigate to="/login" />;
  }

  return (
    <div className="size-full bg-gray-50">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SampleDataLoader />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-check"
          element={
            <ProtectedRoute>
              <DailyCheck />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weekly-upload"
          element={
            <ProtectedRoute>
              <WeeklyUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <UsageHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savings"
          element={
            <ProtectedRoute>
              <Savings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wireframe"
          element={
            <ProtectedRoute>
              <Wireframe />
            </ProtectedRoute>
          }
        />
      </Routes>
      <BottomNav />
      <Toaster />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      SplashScreen.hide();
    }

    let listenerHandle: any;

    const handleAppExit = () => {
      CapacitorApp.exitApp();
    };

    // Add back button listener
    CapacitorApp.addListener('backButton', handleAppExit).then((handle) => {
      listenerHandle = handle;
    });

    return () => {
      // Remove listener on cleanup
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}