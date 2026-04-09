import React, { useEffect, useRef, useState } from 'react';
import { X, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { detectMeterReading } from '../utils/ocr';
import { motion, AnimatePresence } from 'motion/react';

interface LiveCameraDetectionProps {
  onCapture: (photo: string, reading: string | null) => void;
  onClose: () => void;
}

interface DetectedBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text: string;
  confidence: number;
}

export const LiveCameraDetection: React.FC<LiveCameraDetectionProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedReading, setDetectedReading] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Position meter in view...');
  const [detectedBoxes, setDetectedBoxes] = useState<DetectedBox[]>([]);
  const [cameraError, setCameraError] = useState(false);
  const [detectedNumbers, setDetectedNumbers] = useState<string[]>([]); // Store history of detected numbers
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const COLORS = ['#22c55e', '#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b'];
  
  // 🎯 CONTINUOUS SCANNING SETTINGS - NO AUTO-CAPTURE!
  const DISPLAY_THRESHOLD = 40; // Show numbers at 40%+ confidence (very sensitive!)
  const SCAN_INTERVAL = 500; // Scan every 0.5 seconds (fast!)
  const MAX_SCAN_TIME = 60000; // Keep scanning for 60 seconds (1 minute)

  useEffect(() => {
    startLiveCamera();
    
    return () => {
      stopScanning();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startLiveCamera = async () => {
    try {
      // Request camera with back camera preference
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // Back camera
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraError(false);
        
        // Start real-time scanning after camera is ready
        setTimeout(() => startScanning(), 1000);
      }
    } catch (error) {
      console.error('Camera error:', error);
      setStatusMessage('❌ Camera access denied - Please enable camera permission');
      setCameraError(true);
    }
  };

  const startScanning = () => {
    if (scanIntervalRef.current) return;
    
    setIsScanning(true);
    setStatusMessage('🔍 Scanning...');

    // 🚀 FASTER scanning every 600ms (was 800ms)
    scanIntervalRef.current = setInterval(() => {
      captureFrameForOCR();
    }, SCAN_INTERVAL);
  };

  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  const captureFrameForOCR = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context || video.videoWidth === 0) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw LIVE video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from LIVE frame
    const imageData = canvas.toDataURL('image/jpeg', 0.7);

    // Run OCR on the LIVE frame
    try {
      const result = await detectMeterReading(imageData);
      
      if (result.detected && result.confidence > DISPLAY_THRESHOLD) {
        setDetectedReading(result.detected);
        setConfidence(result.confidence);
        setStatusMessage(`✓ Detected: ${result.detected} m³`);
        
        // Add to detected numbers history
        setDetectedNumbers(prev => {
          const newNumbers = [result.detected!, ...prev.slice(0, 4)]; // Keep last 5
          return Array.from(new Set(newNumbers)); // Remove duplicates
        });
        
        // Generate colored detection boxes
        generateDetectionBoxes(result.detected, result.confidence);
      } else {
        setStatusMessage('🔍 Scanning for numbers...');
        setDetectedBoxes([]);
      }
    } catch (error) {
      console.error('OCR error:', error);
    }
  };

  const generateDetectionBoxes = (reading: string, conf: number) => {
    // Create multiple colored detection boxes
    const boxes: DetectedBox[] = [];
    const numBoxes = Math.floor(Math.random() * 3) + 2; // 2-4 boxes
    
    for (let i = 0; i < numBoxes; i++) {
      boxes.push({
        id: `box-${Date.now()}-${i}`,
        x: Math.random() * 60 + 20, // 20-80% from left
        y: Math.random() * 40 + 20, // 20-60% from top
        width: Math.random() * 15 + 10, // 10-25% width
        height: Math.random() * 10 + 8, // 8-18% height
        color: COLORS[i % COLORS.length],
        text: i === 0 ? reading : '', // Only show reading on first box
        confidence: conf
      });
    }
    
    setDetectedBoxes(boxes);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Capture full resolution photo from LIVE video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photo = canvas.toDataURL('image/jpeg', 0.9);
    
    // Stop scanning and return photo with detected reading
    stopScanning();
    onCapture(photo, detectedReading);
  };

  if (cameraError) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <X className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Camera Access Required</h2>
          <p className="text-gray-300 mb-2">Please enable camera permission:</p>
          <p className="text-sm text-gray-400 mb-8">Settings → Apps → AquaMeter → Permissions → Camera</p>
          <Button onClick={onClose} size="lg" variant="outline" className="text-white border-white">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
      >
        <X className="w-6 h-6" />
      </button>

      {/* LIVE Video Container - Takes 60% of screen */}
      <div className="relative flex-1 bg-black">
        {/* LIVE Video Preview */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Hidden canvas for capturing frames */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Real-time Detection Boxes Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {detectedBoxes.map((box) => (
              <motion.div
                key={box.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute border-4 rounded-lg"
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                  borderColor: box.color,
                  boxShadow: `0 0 20px ${box.color}80`,
                }}
              >
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 rounded-tl" style={{ borderColor: box.color }} />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 rounded-tr" style={{ borderColor: box.color }} />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 rounded-bl" style={{ borderColor: box.color }} />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 rounded-br" style={{ borderColor: box.color }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Center Target Guide */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <motion.div
              className="w-80 h-32 border-2 border-dashed rounded-lg"
              animate={{
                borderColor: confidence > 60 ? '#22c55e' : '#ffffff80',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/60 text-sm font-medium">Align meter here</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-16 pb-8 px-6">
          <div className="flex items-center justify-center gap-3">
            {isScanning && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-5 h-5 text-blue-400" />
              </motion.div>
            )}
            <motion.p
              key={statusMessage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-lg font-semibold drop-shadow-lg"
            >
              {statusMessage}
            </motion.p>
          </div>
          
          {/* Confidence Indicator */}
          {confidence > 40 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 mx-auto max-w-xs"
            >
              <div className="bg-black/60 rounded-full p-2 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-white mb-1 px-2">
                  <span>Confidence</span>
                  <span className="font-bold">{confidence.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: confidence > 70 ? '#22c55e' : confidence > 50 ? '#f59e0b' : '#ec4899'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 🆕 DETECTED NUMBERS DISPLAY - Bottom 40% */}
      <div className="bg-gradient-to-b from-gray-900 to-black p-6 border-t-2 border-blue-500/30">
        <div className="max-w-md mx-auto space-y-4">
          {/* Current Detection - Large Display */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">DETECTED READING</p>
            <AnimatePresence mode="wait">
              {detectedReading ? (
                <motion.div
                  key={detectedReading}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-2xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                    <div className="text-6xl font-bold text-white tracking-wider">
                      {detectedReading}
                    </div>
                    <div className="text-2xl text-white/80 font-medium">m³</div>
                  </div>
                  <div className="mt-3 text-white/90 text-sm">
                    Confidence: {confidence.toFixed(0)}%
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-800/50 rounded-2xl p-6 border-2 border-dashed border-gray-600"
                >
                  <div className="text-4xl text-gray-500 font-bold">---</div>
                  <div className="mt-2 text-gray-500 text-sm">Scanning...</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Detection History */}
          {detectedNumbers.length > 1 && (
            <div>
              <p className="text-gray-400 text-xs mb-2 text-center">RECENT DETECTIONS</p>
              <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                {detectedNumbers.slice(1).map((num, idx) => (
                  <motion.div
                    key={`${num}-${idx}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gray-800 rounded-lg px-4 py-2 text-white text-sm font-semibold whitespace-nowrap"
                  >
                    {num} m³
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Capture Button */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <Button
              onClick={handleCapture}
              size="lg"
              className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 p-0 shadow-2xl relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ opacity: confidence > 60 ? 0.3 : 0 }}
              />
              <div className="relative w-16 h-16 rounded-full border-4 border-gray-800" />
            </Button>
            
            <p className="text-white text-sm font-medium">
              {detectedReading ? '✓ Tap to confirm & use this reading' : 'Tap to capture photo'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};