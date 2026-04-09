import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Upload, AlertCircle, Image, Sparkles, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { takePicture, pickImage } from '../utils/camera';
import { detectMeterReading } from '../utils/ocr';

export const WeeklyUpload = () => {
  const navigate = useNavigate();
  const { addReading, readings, settings, getCurrentCycleWeek } = useApp();
  const [reading, setReading] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadDate, setUploadDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD format
  const [isDetecting, setIsDetecting] = useState(false);
  const [isDetectedValue, setIsDetectedValue] = useState(false);
  const [detectionConfidence, setDetectionConfidence] = useState(0);

  const currentWeek = getCurrentCycleWeek();

  const lastWeeklyReading = readings
    .filter(r => r.type === 'weekly')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const getCurrentMonthUsage = () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyReadings = readings
      .filter(r => r.type === 'weekly' && new Date(r.date) >= monthStart)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (monthlyReadings.length < 2) return 0;

    const firstReading = monthlyReadings[0].reading;
    const lastReading = monthlyReadings[monthlyReadings.length - 1].reading;

    return lastReading - firstReading;
  };

  const handleTakePhoto = async () => {
    try {
      console.log('handleTakePhoto clicked');
      toast.loading('Opening camera...', { id: 'camera' });

      const photo = await takePicture();

      if (photo) {
        setImagePreview(photo);
        toast.success('Photo captured!', { id: 'camera' });

        // Auto-detect meter reading from image
        runOCRDetection(photo);
      } else {
        toast.error('Failed to capture photo. Please try again.', { id: 'camera' });
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast.error('Camera error: ' + (error as Error).message, { id: 'camera' });
    }
  };

  const handlePickGallery = async () => {
    try {
      console.log('handlePickGallery clicked');
      toast.loading('Opening gallery...', { id: 'gallery' });

      const photo = await pickImage();

      if (photo) {
        setImagePreview(photo);
        toast.success('Image selected!', { id: 'gallery' });

        // Auto-detect meter reading from image
        runOCRDetection(photo);
      } else {
        toast.error('Failed to pick image. Please try again.', { id: 'gallery' });
      }
    } catch (error) {
      console.error('Gallery error:', error);
      toast.error('Gallery error: ' + (error as Error).message, { id: 'gallery' });
    }
  };

  // OCR Detection Function - Auto-detect numbers from image
  const runOCRDetection = async (photo: string) => {
    setIsDetecting(true);
    toast.loading('🔍 Detecting meter reading...', { id: 'ocr' });

    try {
      const result = await detectMeterReading(photo);

      console.log('🎯 OCR Result:', result);

      // Show ANY detected value, regardless of confidence
      if (result.detected) {
        setReading(result.detected);
        setIsDetectedValue(true);
        setDetectionConfidence(result.confidence);

        if (result.confidence > 50) {
          toast.success(`✨ Detected: ${result.detected} m³ (${result.confidence.toFixed(0)}% confidence)`, {
            id: 'ocr',
            duration: 5000,
          });
        } else if (result.confidence > 20) {
          toast.success(`✨ Detected: ${result.detected} m³ (${result.confidence.toFixed(0)}% confidence) - Please verify`, {
            id: 'ocr',
            duration: 5000,
          });
        } else {
          toast.warning(`⚠️ Detected: ${result.detected} m³ (Low confidence: ${result.confidence.toFixed(0)}%) - Please verify!`, {
            id: 'ocr',
            duration: 6000,
          });
        }
      } else {
        console.log('❌ No reading detected');
        toast.info('Could not detect reading. Please enter manually.', {
          id: 'ocr',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('OCR error:', error);
      toast.error('Detection failed. Please enter manually.', { id: 'ocr' });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error('Please upload a meter photo');
      return;
    }

    const readingValue = parseFloat(reading);
    if (isNaN(readingValue) || readingValue < 0) {
      toast.error('Please enter a valid meter reading');
      return;
    }

    // ✅ Allow backdating: Check if reading is less than previous ONLY if it's a newer date
    const selectedDate = new Date(uploadDate + 'T12:00:00');
    if (lastWeeklyReading) {
      const lastDate = new Date(lastWeeklyReading.date);
      
      // If the new reading is for a date AFTER the last reading, it must be higher
      if (selectedDate > lastDate && readingValue < lastWeeklyReading.reading) {
        toast.error('Reading cannot be less than previous reading for a later date');
        return;
      }
      
      // If backdating (earlier date), allow any value but warn if it seems wrong
      if (selectedDate < lastDate && readingValue > lastWeeklyReading.reading) {
        toast.warning('⚠️ Backdated reading is higher than a later reading. Please verify.');
      }
    }
    
    addReading({
      date: selectedDate.toISOString(),
      reading: readingValue,
      imageUrl: imagePreview,
      type: 'weekly',
    });

    toast.success('Weekly reading uploaded successfully!');
    navigate('/dashboard');
  };

  const weeklyConsumption = lastWeeklyReading ? parseFloat(reading) - lastWeeklyReading.reading : 0;
  const currentMonthUsage = getCurrentMonthUsage();
  const projectedTotal = currentMonthUsage + (weeklyConsumption > 0 ? weeklyConsumption : 0);
  const willExceedLimit = projectedTotal > settings.monthlyLimit;

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-white/20 rounded">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Weekly Upload</h1>
        </div>
        <p className="text-blue-100 text-sm ml-10">Submit your official weekly reading</p>
      </div>

      <div className="p-6 space-y-4">
        {/* 🆕 4-Week Billing Cycle Status */}
        {currentWeek >= 0 && (
          <Card className="border-blue-300 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-900">
                  📊 Monthly Monitoring Cycle
                </h3>
                <span className="text-sm text-blue-700 font-medium">
                  {currentWeek === 0 ? 'Start New Month' : `Week ${currentWeek}/4`}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((week) => (
                  <div
                    key={week}
                    className={`flex-1 h-2 rounded-full ${
                      week <= currentWeek
                        ? 'bg-blue-600'
                        : week === currentWeek + 1
                        ? 'bg-blue-400 animate-pulse'
                        : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-blue-800 mt-2">
                {currentWeek === 0
                  ? '▶️ Upload Week 1 reading to start monthly monitoring'
                  : currentWeek === 4
                  ? '✅ Month complete! Bill generated. Next upload starts new month.'
                  : `📌 Uploading Week ${currentWeek + 1} reading`}
              </p>
            </CardContent>
          </Card>
        )}
        
        {/* Info Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-2">
                  📊 How Monthly Billing Works:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Weeks 1-3:</strong> Upload readings for monitoring</li>
                  <li><strong>Week 4:</strong> Final reading → Bill calculated</li>
                  <li><strong>Calculation:</strong> Week 4 Reading − Week 1 Reading = Usage</li>
                  <li><strong>Limit Check:</strong> Usage ≤ 30 m³ = Success! 🎉</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Month Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Current Month Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Usage</p>
                <p className="text-2xl text-blue-600">{currentMonthUsage.toFixed(1)} m³</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Limit</p>
                <p className="text-2xl text-gray-900">{settings.monthlyLimit} m³</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Reading */}
        {lastWeeklyReading && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Last Weekly Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Reading</p>
                  <p className="text-2xl text-blue-600">{lastWeeklyReading.reading.toFixed(2)} m³</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-sm">
                    {new Date(lastWeeklyReading.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload This Week's Reading</CardTitle>
            <CardDescription>Upload a clear photo of your water meter</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Meter Photo</Label>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Meter preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setImagePreview(null)}
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {/* Camera Button */}
                    <Button
                      type="button"
                      onClick={handleTakePhoto}
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all text-gray-700"
                      variant="outline"
                    >
                      <Camera className="w-12 h-12 text-blue-600 mb-2" />
                      <span className="text-sm font-bold text-blue-900">Take Photo</span>
                      <span className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                        <Sparkles className="w-3 h-3" />
                        Auto-detect numbers
                      </span>
                    </Button>

                    {/* Gallery Button */}
                    <Button
                      type="button"
                      onClick={handlePickGallery}
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all text-gray-700"
                      variant="outline"
                    >
                      <Image className="w-12 h-12 text-blue-600 mb-2" />
                      <span className="text-sm font-bold text-blue-900">Choose from Gallery</span>
                      <span className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                        <Sparkles className="w-3 h-3" />
                        Auto-detect numbers
                      </span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Reading Input */}
              <div className="space-y-2">
                <Label htmlFor="reading">Meter Reading (m³)</Label>
                <div className="relative">
                  <Input
                    id="reading"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 125.50"
                    value={reading}
                    onChange={(e) => {
                      setReading(e.target.value);
                      setIsDetectedValue(false); // User manually edited
                    }}
                    required
                    className={isDetectedValue ? 'border-purple-400 bg-purple-50' : ''}
                    disabled={isDetecting}
                  />
                  {isDetecting && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  {isDetectedValue && !isDetecting && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                </div>
                {isDetectedValue && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                  >
                    <p className="text-xs text-purple-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Auto-detected ({detectionConfidence.toFixed(0)}% confidence) - You can edit if needed
                    </p>
                  </motion.div>
                )}
                {!isDetectedValue && !isDetecting && imagePreview && (
                  <p className="text-xs text-gray-500">
                    💡 Enter your meter reading
                  </p>
                )}
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <Label htmlFor="date">Reading Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]} // Can't select future dates
                  required
                  className="text-base"
                />
                <p className="text-xs text-gray-500">
                  📅 You can select any past date to add historical readings (e.g., last month's data)
                </p>
              </div>

              {/* Consumption Preview */}
              {reading && lastWeeklyReading && weeklyConsumption > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-lg ${
                    willExceedLimit
                      ? 'bg-red-50 border-red-200'
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <p className="text-sm mb-2">This Week's Consumption</p>
                  <p className="text-2xl mb-3">{weeklyConsumption.toFixed(2)} m³</p>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">Projected Monthly Total</p>
                    <p className={`text-xl ${willExceedLimit ? 'text-red-600' : 'text-gray-900'}`}>
                      {projectedTotal.toFixed(1)} m³
                    </p>
                    {willExceedLimit && (
                      <p className="text-sm text-red-600 mt-1">
                        ⚠️ This will exceed your monthly limit!
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Weekly Reading
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};