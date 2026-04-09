import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Camera, Calendar, Droplets, TrendingDown, Bell, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    user, 
    getCurrentMonthUsage, 
    settings, 
    getMonthlyBill, 
    getMonthlySavings, 
    notifications, 
    getDaysSinceLastWeeklyUpload, 
    checkWeeklyUploadReminder,
    getCurrentCycleWeek,
    getCurrentCycleUsage 
  } = useApp();

  const currentUsage = getCurrentCycleUsage(); // Use cycle-based usage
  const usagePercentage = (currentUsage / settings.monthlyLimit) * 100;
  const monthlyBill = getMonthlyBill();
  const { waterSaved, moneySaved } = getMonthlySavings();
  const unreadCount = notifications.filter(n => !n.read).length;
  const daysSinceLastUpload = getDaysSinceLastWeeklyUpload();
  const currentWeek = getCurrentCycleWeek(); // Get current week (1-4)

  // Check for weekly upload reminder on dashboard load
  React.useEffect(() => {
    if (daysSinceLastUpload >= 7) {
      checkWeeklyUploadReminder();
    }
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl">Hello, {user?.name || 'User'}! 👋</h1>
            <p className="text-blue-100 text-sm">Track your water usage</p>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Monthly Usage Card */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              Monthly Water Usage
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl text-blue-600">
                    {currentUsage.toFixed(1)} <span className="text-lg">m³</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    of {settings.monthlyLimit} m³ limit
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl ${usagePercentage > 100 ? 'text-red-600' : 'text-green-600'}`}>
                    {usagePercentage.toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-600">used</div>
                </div>
              </div>
              <Progress 
                value={Math.min(usagePercentage, 100)} 
                className={usagePercentage > 80 ? '[&>div]:bg-red-500' : '[&>div]:bg-blue-500'}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-2 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/daily-check')}
              className="w-full h-32 bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-200 flex flex-col gap-2 shadow-md"
            >
              <Camera className="w-8 h-8" />
              <div className="text-center">
                <span className="text-base font-semibold block">Daily Check</span>
                <span className="text-xs text-gray-600">Awareness Only</span>
              </div>
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/weekly-upload')}
              className="w-full h-32 bg-blue-600 hover:bg-blue-700 text-white flex flex-col gap-2 shadow-md"
            >
              <Calendar className="w-8 h-8" />
              <div className="text-center">
                <span className="text-base font-semibold block">Weekly Upload</span>
                <span className="text-xs opacity-90">Official Tracking</span>
              </div>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 space-y-4">
        {/* 🆕 4-Week Billing Cycle Progress */}
        {currentWeek > 0 && (
          <Card className="border-blue-300 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900">
                  📊 Monthly Monitoring (4 Weeks)
                </h3>
                <span className="text-sm text-blue-700 font-medium">
                  Week {currentWeek}/4
                </span>
              </div>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4].map((week) => (
                  <div
                    key={week}
                    className={`flex-1 h-3 rounded-full ${
                      week <= currentWeek
                        ? 'bg-blue-600'
                        : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-blue-800">
                {currentWeek === 4
                  ? '✅ Month complete! Your bill has been calculated.'
                  : `${4 - currentWeek} week${4 - currentWeek > 1 ? 's' : ''} until end of month billing`}
              </p>
            </CardContent>
          </Card>
        )}
        
        {/* Weekly Upload Reminder */}
        {daysSinceLastUpload >= 7 && currentWeek < 4 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-orange-300 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-orange-900 mb-1">
                      📅 Weekly Upload Reminder
                    </h3>
                    <p className="text-sm text-orange-800 mb-3">
                      It's been <strong>{daysSinceLastUpload} days</strong> since your last weekly reading. 
                      Don't forget to upload this week's meter reading!
                    </p>
                    <Button
                      onClick={() => navigate('/weekly-upload')}
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      Upload Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <StatsCard
          icon={<DollarSign className="w-5 h-5" />}
          title="Monthly Bill"
          value={`₱${monthlyBill.toFixed(2)}`}
          description="Current month estimate"
          color="text-orange-600"
          bgColor="bg-orange-100"
        />

        {waterSaved > 0 && (
          <StatsCard
            icon={<TrendingDown className="w-5 h-5" />}
            title="Water Saved"
            value={`${waterSaved.toFixed(1)} m³`}
            description={`₱${moneySaved.toFixed(2)} saved`}
            color="text-green-600"
            bgColor="bg-green-100"
          />
        )}
      </div>
    </div>
  );
};

const StatsCard = ({
  icon,
  title,
  value,
  description,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  bgColor: string;
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`text-2xl ${color}`}>{value}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);