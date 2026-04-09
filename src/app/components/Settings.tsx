import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, User, Settings as SettingsIcon, LogOut, Save, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

export const Settings = () => {
  const navigate = useNavigate();
  const { user, settings, updateSettings, logout, clearAllData } = useApp();

  const [monthlyLimit, setMonthlyLimit] = useState(settings.monthlyLimit.toString());
  const [tariffRate, setTariffRate] = useState(settings.tariffRate.toString());
  const [waterProvider, setWaterProvider] = useState(settings.waterProvider);
  const [enableNotifications, setEnableNotifications] = useState(settings.enableNotifications);

  const handleSave = () => {
    const limit = parseFloat(monthlyLimit);
    const rate = parseFloat(tariffRate);

    if (isNaN(limit) || limit <= 0) {
      toast.error('Please enter a valid monthly limit');
      return;
    }

    if (isNaN(rate) || rate <= 0) {
      toast.error('Please enter a valid tariff rate');
      return;
    }

    updateSettings({
      monthlyLimit: limit,
      tariffRate: rate,
      waterProvider,
      enableNotifications,
    });

    toast.success('Settings saved successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-white/20 rounded">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Settings</h1>
        </div>
        <p className="text-blue-100 text-sm ml-10">Configure your preferences</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg">{user?.name || 'User'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg">{user?.email || 'user@example.com'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Water Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Water Usage Settings
            </CardTitle>
            <CardDescription>Configure your water monitoring preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Water Provider */}
            <div className="space-y-2">
              <Label htmlFor="provider">Water Provider</Label>
              <Select value={waterProvider} onValueChange={setWaterProvider}>
                <SelectTrigger id="provider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Richli Water">Richli Water</SelectItem>
                  <SelectItem value="Bohol Water Utilities, Inc.">Bohol Water Utilities, Inc.</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Limit */}
            <div className="space-y-2">
              <Label htmlFor="limit">Monthly Water Limit (m³)</Label>
              <Input
                id="limit"
                type="number"
                step="0.1"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value)}
                placeholder="e.g., 30"
              />
              <p className="text-xs text-gray-500">
                You'll receive alerts when approaching this limit
              </p>
            </div>

            {/* Tariff Rate */}
            <div className="space-y-2">
              <Label htmlFor="rate">Tariff Rate (₱ per m³)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={tariffRate}
                onChange={(e) => setTariffRate(e.target.value)}
                placeholder="e.g., 25.00"
              />
              <p className="text-xs text-gray-500">
                Cost per cubic meter from your water provider
              </p>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Enable Notifications</p>
                <p className="text-xs text-gray-500">Get alerts for usage limits</p>
              </div>
              <Switch
                checked={enableNotifications}
                onCheckedChange={setEnableNotifications}
              />
            </div>

            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* Rate Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">💡 Tariff Rate Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="mb-2"><strong>Richli Water</strong></p>
              <ul className="space-y-1 text-xs ml-4">
                <li>• 0-10 m³: ₱12.00 per m³</li>
                <li>• 11-20 m³: ₱18.00 per m³</li>
                <li>• 21-30 m³: ₱25.00 per m³</li>
                <li>• 31+ m³: ₱32.00 per m³</li>
              </ul>
            </div>
            <div>
              <p className="mb-2"><strong>Bohol Water Utilities</strong></p>
              <ul className="space-y-1 text-xs ml-4">
                <li>• 0-10 m³: ₱15.00 per m³</li>
                <li>• 11-20 m³: ₱20.00 per m³</li>
                <li>• 21-40 m³: ₱28.00 per m³</li>
                <li>• 41+ m³: ₱35.00 per m³</li>
              </ul>
            </div>
            <p className="text-xs text-gray-500 italic">
              * These are example rates. Check your actual water bill for accurate rates.
            </p>
          </CardContent>
        </Card>

        {/* Help */}
        <Card>
          <CardContent className="p-4">
            <Button 
              onClick={() => navigate('/help')} 
              variant="outline" 
              className="w-full"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Guide
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button 
              onClick={handleLogout} 
              variant="destructive" 
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Clear All Data */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-base text-red-600">⚠️ Danger Zone</CardTitle>
            <CardDescription>Permanently delete all your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              This will clear all readings, notifications, and settings. This action cannot be undone.
            </p>
            <Button 
              onClick={() => {
                if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
                  clearAllData();
                  toast.success('All data cleared successfully');
                }
              }}
              variant="outline" 
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};