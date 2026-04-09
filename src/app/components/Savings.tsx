import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, TrendingDown, DollarSign, Droplets, Award, ChevronDown, ChevronUp, Folder } from 'lucide-react';
import { motion } from 'motion/react';

export const Savings = () => {
  const navigate = useNavigate();
  const { getCurrentMonthUsage, settings, getMonthlyBill, getMonthlySavings, readings } = useApp();
  const [expandedMonths, setExpandedMonths] = React.useState<string[]>([]);

  const currentUsage = getCurrentMonthUsage();
  const monthlyBill = getMonthlyBill();
  const { waterSaved, moneySaved } = getMonthlySavings();
  const targetBill = settings.monthlyLimit * settings.tariffRate;

  const percentageSaved = settings.monthlyLimit > 0 
    ? ((waterSaved / settings.monthlyLimit) * 100).toFixed(0)
    : 0;

  // Get all months that have weekly readings
  const getMonthlyHistory = () => {
    const monthlyData: {
      [key: string]: {
        month: string;
        year: number;
        totalUsage: number;
        totalBill: number;
        savings: number;
        readingsCount: number;
        readings: typeof readings;
      };
    } = {};

    // Group readings by month
    readings
      .filter(r => r.type === 'weekly')
      .forEach(reading => {
        const date = new Date(reading.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            month: monthName,
            year: date.getFullYear(),
            totalUsage: 0,
            totalBill: 0,
            savings: 0,
            readingsCount: 0,
            readings: [],
          };
        }

        monthlyData[monthKey].readings.push(reading);
        monthlyData[monthKey].readingsCount += 1;
      });

    // ✅ Calculate usage correctly for each month: Last - First reading
    Object.keys(monthlyData).forEach(key => {
      const data = monthlyData[key];
      
      // Sort readings by date
      const sortedReadings = data.readings.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      // Calculate total usage: Last reading - First reading
      if (sortedReadings.length >= 2) {
        const firstReading = sortedReadings[0].reading;
        const lastReading = sortedReadings[sortedReadings.length - 1].reading;
        data.totalUsage = lastReading - firstReading;
      } else {
        // Only one reading = baseline, no consumption yet
        data.totalUsage = 0;
      }
      
      data.totalBill = data.totalUsage * settings.tariffRate;
      data.savings = data.totalUsage < settings.monthlyLimit 
        ? (settings.monthlyLimit - data.totalUsage) * settings.tariffRate 
        : 0;
    });

    // Sort by date (newest first)
    return Object.entries(monthlyData)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, data]) => ({ key, ...data }));
  };

  const monthlyHistory = getMonthlyHistory();

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths(prev =>
      prev.includes(monthKey)
        ? prev.filter(k => k !== monthKey)
        : [...prev, monthKey]
    );
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-white/20 rounded">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Savings</h1>
        </div>
        <p className="text-green-100 text-sm ml-10">Your water conservation impact</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Main Savings Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <p className="text-sm opacity-90 mb-2">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              {waterSaved > 0 ? (
                <>
                  <div className="text-5xl mb-2">₱{moneySaved.toFixed(2)}</div>
                  <p className="text-green-100 mb-1 font-semibold">Potential Savings This Month</p>
                  <p className="text-xs text-green-100 opacity-80 mb-4">
                    💰 This is how much you'll save if you stay within your limit
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm opacity-90 mb-1">Water To Be Conserved</p>
                    <p className="text-2xl">{waterSaved.toFixed(1)} m³</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-2">Keep Going! 💧</div>
                  <p className="text-green-100">
                    {currentUsage >= settings.monthlyLimit
                      ? 'You\'ve exceeded your monthly limit'
                      : 'Stay below your limit to save water and money'}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Comparison</CardTitle>
            <CardDescription>Your usage vs. target limit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Current Usage</p>
                <p className="text-xl text-blue-600">{currentUsage.toFixed(1)} m³</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Droplets className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Target Limit</p>
                <p className="text-xl text-gray-900">{settings.monthlyLimit} m³</p>
              </div>
            </div>

            {waterSaved > 0 && (
              <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg">
                <TrendingDown className="w-5 h-5 text-green-600" />
                <span className="text-green-900">
                  You saved {percentageSaved}% of your target usage!
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Billing Summary</CardTitle>
            <CardDescription>Cost breakdown at ₱{settings.tariffRate}/m³</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Current Bill</span>
              </div>
              <span className="text-lg">₱{monthlyBill.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Target Bill</span>
              </div>
              <span className="text-lg text-gray-600">₱{targetBill.toFixed(2)}</span>
            </div>

            {moneySaved > 0 && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-900">Amount Saved</span>
                </div>
                <span className="text-lg text-green-600">₱{moneySaved.toFixed(2)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly History Folders */}
        {monthlyHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💰 BILL PER MONTH</CardTitle>
              <CardDescription>View billing summaries by month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {monthlyHistory.map(month => (
                <div key={month.key} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Month Header */}
                  <button
                    onClick={() => toggleMonth(month.key)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{month.month}</p>
                        <p className="text-xs text-gray-500">{month.readingsCount} weekly uploads</p>
                      </div>
                    </div>
                    {expandedMonths.includes(month.key) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  {/* Billing Summary (Expanded) */}
                  {expandedMonths.includes(month.key) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white"
                    >
                      <div className="p-4 space-y-3 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Billing Summary</p>
                        
                        {/* Total Usage */}
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-blue-600" />
                            <span className="text-sm">Total Usage</span>
                          </div>
                          <span className="text-lg font-semibold text-blue-600">{month.totalUsage.toFixed(1)} m³</span>
                        </div>

                        {/* Total Bill */}
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-gray-700" />
                            <span className="text-sm">Total Bill</span>
                          </div>
                          <span className="text-lg font-semibold">₱{month.totalBill.toFixed(2)}</span>
                        </div>

                        {/* Target Limit */}
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-gray-600" />
                            <span className="text-sm">Monthly Limit</span>
                          </div>
                          <span className="text-lg text-gray-600">{settings.monthlyLimit} m³</span>
                        </div>

                        {/* Amount Saved */}
                        {month.savings > 0 ? (
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-green-600" />
                              <span className="text-sm text-green-900 font-medium">Amount Saved</span>
                            </div>
                            <span className="text-lg font-semibold text-green-600">₱{month.savings.toFixed(2)}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-red-600" />
                              <span className="text-sm text-red-900 font-medium">Over Limit</span>
                            </div>
                            <span className="text-lg font-semibold text-red-600">
                              +{(month.totalUsage - settings.monthlyLimit).toFixed(1)} m³
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Conservation Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">💡 Water Saving Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Fix leaking faucets and pipes immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Use a bucket to collect water while waiting for it to heat up</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Take shorter showers and turn off water while soaping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Reuse water from washing vegetables for plants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Run dishwasher and washing machine only with full loads</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};