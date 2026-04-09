import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Info, Sparkles, Image, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { takePicture, pickImage } from '../utils/camera';
import { detectMeterReading } from '../utils/ocr';

export const DailyCheck = () => {
  const navigate = useNavigate();
  const { settings, getCurrentMonthUsage, getLastWeeklyReading } = useApp();
  const [reading, setReading] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isDetectedValue, setIsDetectedValue] = useState(false);
  const [detectionConfidence, setDetectionConfidence] = useState(0);

  const lastWeeklyReading = getLastWeeklyReading();
  const currentMonthUsage = getCurrentMonthUsage();

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

  const handlePickImage = async () => {
    try {
      console.log('handlePickImage clicked');
      toast.loading('Opening gallery...', { id: 'gallery' });

      const photo = await pickImage();

      if (photo) {
        setImagePreview(photo);
        toast.success('Photo selected!', { id: 'gallery' });

        // Auto-detect meter reading from image
        runOCRDetection(photo);
      } else {
        toast.error('Failed to select photo. Please try again.', { id: 'gallery' });
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
      toast.error('Please take a meter photo');
      return;
    }

    const readingValue = parseFloat(reading);
    if (isNaN(readingValue) || readingValue < 0) {
      toast.error('Please enter a valid meter reading');
      return;
    }

    if (lastWeeklyReading && readingValue < lastWeeklyReading.reading) {
      toast.error('Reading cannot be less than last weekly reading');
      return;
    }

    // Don't save - just show immediate result
    setShowResult(true);
    toast.success('Daily check complete! No data saved.');
  };

  const consumption = lastWeeklyReading ? parseFloat(reading || '0') - lastWeeklyReading.reading : 0;
  const waterLeft = settings.monthlyLimit - currentMonthUsage - consumption;
  const percentageUsed = ((currentMonthUsage + consumption) / settings.monthlyLimit) * 100;

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-white/20 rounded">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Daily Check</h1>
        </div>
        <p className="text-blue-100 text-sm ml-10">Check how much water you have left</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Info Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="mb-2">
                  <strong>Daily Check is for AWARENESS ONLY!</strong> No data is saved. 
                  This helps you see how much water you have left for the month.
                </p>
                <p>For official tracking & notifications, use <strong>Weekly Upload</strong>.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Weekly Reading Reference */}
        {lastWeeklyReading && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Last Weekly Reading (Reference)</CardTitle>
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

        {/* Current Month Usage */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">This Month So Far</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Usage</p>
                <p className="text-2xl text-purple-600">{currentMonthUsage.toFixed(2)} m³</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Monthly Limit</p>
                <p className="text-2xl text-gray-700">{settings.monthlyLimit} m³</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result Display - Only show AFTER submit */}
        {showResult && reading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* Today's Consumption */}
            {consumption > 0 && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <p className="text-sm text-green-900 mb-1">📊 Current Usage (Since Last Weekly)</p>
                  <p className="text-3xl text-green-600">{consumption.toFixed(2)} m³</p>
                </CardContent>
              </Card>
            )}

            {/* Water Left */}
            <Card className={`border-2 ${
              waterLeft > settings.monthlyLimit * 0.2 
                ? 'border-blue-500 bg-blue-50' 
                : waterLeft > 0 
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-red-500 bg-red-50'
            }`}>
              <CardContent className="p-6 text-center">
                <p className="text-sm mb-2 font-semibold">💧 Water Left This Month</p>
                <p className={`text-5xl mb-2 ${
                  waterLeft > settings.monthlyLimit * 0.2 
                    ? 'text-blue-600' 
                    : waterLeft > 0 
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  {waterLeft > 0 ? waterLeft.toFixed(1) : '0.0'} m³
                </p>
                <p className="text-sm text-gray-600">
                  {percentageUsed.toFixed(0)}% of monthly limit used
                </p>
                {waterLeft <= 0 && (
                  <p className="text-sm text-red-600 mt-2 font-semibold">
                    ⚠️ You've exceeded your monthly limit!
                  </p>
                )}
                {waterLeft > 0 && waterLeft <= settings.monthlyLimit * 0.2 && (
                  <p className="text-sm text-yellow-600 mt-2 font-semibold">
                    ⚡ Warning: Running low on your monthly limit!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  setReading('');
                  setImagePreview(null);
                  setShowResult(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Check Again
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        )}

        {/* Upload Form - Hide after showing result */}
        {!showResult && (
          <Card>
            <CardHeader>
              <CardTitle>Check Today's Usage</CardTitle>
              <CardDescription>Upload a photo & automatically detect your meter reading</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Meter Photo (for reference only)</Label>
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
                        onClick={handlePickImage}
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
                  <Label htmlFor="reading">Current Meter Reading (m³)</Label>
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

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Info className="w-4 h-4 mr-2" />
                  Check My Usage (No Data Saved)
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};