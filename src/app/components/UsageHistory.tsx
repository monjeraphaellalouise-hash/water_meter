import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Calendar, Droplets, TrendingUp, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from 'sonner';

export const UsageHistory = () => {
  const navigate = useNavigate();
  const { readings, getCurrentCycleUsage, deleteReading } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'daily'>('weekly');

  const weeklyReadings = readings
    .filter(r => r.type === 'weekly')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const dailyReadings = readings
    .filter(r => r.type === 'daily')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const weeklyChartData = weeklyReadings.map((r, index) => {
    const dateStr = new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return {
      // Append index to date if there might be duplicates
      date: index > 0 && weeklyReadings[index - 1] && 
            new Date(weeklyReadings[index - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === dateStr
        ? `${dateStr} (${index + 1})`
        : dateStr,
      consumption: r.consumption || 0,
      reading: r.reading,
      id: r.id,
    };
  });

  const dailyChartData = dailyReadings.slice(-7).map((r, index) => {
    const dateStr = new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const slicedReadings = dailyReadings.slice(-7);
    return {
      // Append index to date if there might be duplicates
      date: index > 0 && slicedReadings[index - 1] && 
            new Date(slicedReadings[index - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === dateStr
        ? `${dateStr} (${index + 1})`
        : dateStr,
      consumption: r.consumption || 0,
      id: r.id,
    };
  });

  const currentCycleUsage = getCurrentCycleUsage();
  const totalWeeklyReadings = weeklyReadings.length;
  const avgWeeklyConsumption = weeklyReadings.length > 0
    ? weeklyReadings.reduce((sum, r) => sum + (r.consumption || 0), 0) / weeklyReadings.length
    : 0;

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-white/20 rounded">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Usage History</h1>
        </div>
        <p className="text-blue-100 text-sm ml-10">Track your water consumption over time</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">This Month</p>
              <p className="text-lg text-blue-600">{currentCycleUsage.toFixed(1)} m³</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Total Logs</p>
              <p className="text-lg text-green-600">{totalWeeklyReadings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 mb-1">Avg/Week</p>
              <p className="text-lg text-purple-600">{avgWeeklyConsumption.toFixed(1)} m³</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'weekly' | 'daily')}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="weekly">Weekly Uploads (Official)</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4 mt-4">
            {/* Weekly Chart */}
            {weeklyChartData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Weekly Consumption Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="consumption" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No weekly readings yet. Upload your first weekly reading to see trends.
                </CardContent>
              </Card>
            )}

            {/* Weekly Readings List */}
            {weeklyReadings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Weekly Readings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {weeklyReadings.slice().reverse().slice(0, 5).map((reading) => (
                    <ReadingCard key={reading.id} reading={reading} onDelete={deleteReading} />
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="daily" className="space-y-4 mt-4">
            {/* Daily Chart */}
            {dailyChartData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Daily Consumption (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={dailyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="consumption" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No daily checks yet. Start checking daily to track your consumption.
                </CardContent>
              </Card>
            )}

            {/* Daily Readings List */}
            {dailyReadings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Daily Checks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dailyReadings.slice().reverse().slice(0, 5).map((reading) => (
                    <ReadingCard key={reading.id} reading={reading} onDelete={deleteReading} />
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ReadingCard = ({ reading, onDelete }: { reading: any; onDelete: (id: string) => void }) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this reading? This action cannot be undone.')) {
      onDelete(reading.id);
      toast.success('Reading deleted successfully');
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
          <img 
            src={reading.imageUrl} 
            alt="Meter" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm">
            {new Date(reading.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p className="text-xs text-gray-600">
            Reading: {reading.reading.toFixed(2)} m³
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="text-sm text-gray-600">Consumed</p>
          {reading.consumption && reading.consumption > 0 ? (
            <p className="text-lg text-blue-600">{reading.consumption.toFixed(2)} m³</p>
          ) : (
            <p className="text-sm text-gray-500 italic">Baseline</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};