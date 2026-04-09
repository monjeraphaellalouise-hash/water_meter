import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Droplets, Camera, BarChart3, Bell, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Droplets className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl mb-2 text-blue-900">AquaMeter</h1>
        <p className="text-blue-700 mb-8">
          Smart Water Monitoring & Conservation
        </p>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <FeatureItem
            icon={<Camera className="w-5 h-5" />}
            title="Daily & Weekly Tracking"
            description="Monitor your water usage effortlessly"
          />
          <FeatureItem
            icon={<BarChart3 className="w-5 h-5" />}
            title="Usage Analytics"
            description="Visualize your consumption patterns"
          />
          <FeatureItem
            icon={<Bell className="w-5 h-5" />}
            title="Smart Alerts"
            description="Get notified when approaching limits"
          />
          <FeatureItem
            icon={<Settings className="w-5 h-5" />}
            title="Savings Calculator"
            description="Track water & money saved monthly"
          />
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate('/register')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Create Account
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start gap-3 text-left bg-white/50 backdrop-blur-sm p-4 rounded-lg"
  >
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-blue-900 mb-1">{title}</h3>
      <p className="text-sm text-blue-600">{description}</p>
    </div>
  </motion.div>
);
