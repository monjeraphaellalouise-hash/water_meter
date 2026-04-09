import React from 'react';

export function Wireframe() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AquaMeter App Wireframe</h1>
          <p className="text-gray-600">Water Meter Monitoring & Conservation System</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Login Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 1</div>
              <h3 className="font-bold text-lg">Login / Register</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col justify-between">
              {/* Logo area */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 border-2 border-dashed border-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-500">LOGO</span>
                </div>
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </div>

              {/* Form area */}
              <div className="space-y-3">
                <div className="h-12 border-2 border-gray-300 rounded flex items-center px-3">
                  <span className="text-xs text-gray-500">Email input</span>
                </div>
                <div className="h-12 border-2 border-gray-300 rounded flex items-center px-3">
                  <span className="text-xs text-gray-500">Password input</span>
                </div>
                <div className="h-12 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-700">LOGIN BUTTON</span>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Dashboard Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 2</div>
              <h3 className="font-bold text-lg">Dashboard</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-3">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
              </div>

              {/* Welcome card */}
              <div className="h-20 bg-blue-100 border-2 border-blue-300 rounded-lg p-3">
                <div className="h-4 w-32 bg-blue-300 rounded mb-2"></div>
                <div className="h-3 w-40 bg-blue-200 rounded"></div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="border-2 border-gray-300 rounded p-2">
                  <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                </div>
                <div className="border-2 border-gray-300 rounded p-2">
                  <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                </div>
                <div className="border-2 border-gray-300 rounded p-2">
                  <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                </div>
                <div className="border-2 border-gray-300 rounded p-2">
                  <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="border-2 border-gray-300 rounded p-3">
                <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-400"></div>
                </div>
              </div>

              {/* Chart area */}
              <div className="flex-1 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">Chart/Graph</span>
              </div>

              {/* Bottom navigation */}
              <div className="flex justify-around border-t-2 border-gray-300 pt-2">
                <div className="w-8 h-8 bg-blue-200 border-2 border-blue-400 rounded"></div>
                <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
                <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
                <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Upload Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 3</div>
              <h3 className="font-bold text-lg">Upload Reading</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>

              {/* Tab selector */}
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-700">DAILY</span>
                </div>
                <div className="flex-1 h-10 border-2 border-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">WEEKLY</span>
                </div>
              </div>

              {/* Camera preview */}
              <div className="flex-1 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
              </div>

              {/* Reading input */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-12 border-2 border-gray-300 rounded flex items-center px-3">
                  <span className="text-xs text-gray-500">Enter reading (m³)</span>
                </div>
              </div>

              {/* Submit button */}
              <div className="h-12 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-700">SUBMIT READING</span>
              </div>
            </div>
          </div>

          {/* History Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 4</div>
              <h3 className="font-bold text-lg">History & Charts</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-28 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-2">
                <div className="px-3 h-8 bg-blue-200 border-2 border-blue-400 rounded">
                  <span className="text-xs">Week</span>
                </div>
                <div className="px-3 h-8 border-2 border-gray-300 rounded">
                  <span className="text-xs">Month</span>
                </div>
                <div className="px-3 h-8 border-2 border-gray-300 rounded">
                  <span className="text-xs">Year</span>
                </div>
              </div>

              {/* Chart */}
              <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-3">
                <div className="h-full flex items-end justify-around gap-1">
                  <div className="w-8 h-1/3 bg-blue-200 border border-blue-400"></div>
                  <div className="w-8 h-2/3 bg-blue-200 border border-blue-400"></div>
                  <div className="w-8 h-1/2 bg-blue-200 border border-blue-400"></div>
                  <div className="w-8 h-4/5 bg-blue-200 border border-blue-400"></div>
                  <div className="w-8 h-3/5 bg-blue-200 border border-blue-400"></div>
                </div>
              </div>

              {/* List items */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded p-2">
                  <div className="w-10 h-10 border border-gray-300 rounded"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-2 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded p-2">
                  <div className="w-10 h-10 border border-gray-300 rounded"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-2 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 5</div>
              <h3 className="font-bold text-lg">Notifications</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
                <div className="text-xs text-gray-500">Clear All</div>
              </div>

              {/* Alert notification */}
              <div className="border-2 border-red-300 bg-red-50 rounded p-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-red-200 border border-red-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">⚠️</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-full bg-red-200 rounded"></div>
                    <div className="h-3 w-3/4 bg-red-200 rounded"></div>
                    <div className="h-2 w-20 bg-red-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Warning notification */}
              <div className="border-2 border-yellow-300 bg-yellow-50 rounded p-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-yellow-200 border border-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">⚡</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-full bg-yellow-200 rounded"></div>
                    <div className="h-3 w-3/4 bg-yellow-200 rounded"></div>
                    <div className="h-2 w-20 bg-yellow-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Reminder notification */}
              <div className="border-2 border-blue-300 bg-blue-50 rounded p-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-200 border border-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">🔔</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-full bg-blue-200 rounded"></div>
                    <div className="h-3 w-3/4 bg-blue-200 rounded"></div>
                    <div className="h-2 w-20 bg-blue-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Regular notification */}
              <div className="border-2 border-gray-300 bg-gray-50 rounded p-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-gray-200 border border-gray-300 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                    <div className="h-2 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 6</div>
              <h3 className="font-bold text-lg">Settings</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>

              {/* Profile section */}
              <div className="flex items-center gap-3 border-b-2 border-gray-200 pb-3">
                <div className="w-16 h-16 border-2 border-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Settings items */}
              <div className="space-y-2 flex-1">
                <div className="h-12 border-2 border-gray-300 rounded flex items-center justify-between px-3">
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  <div className="w-6 h-6 border border-gray-300 rounded"></div>
                </div>
                <div className="h-12 border-2 border-gray-300 rounded flex items-center justify-between px-3">
                  <div className="h-3 w-28 bg-gray-200 rounded"></div>
                  <div className="w-6 h-6 border border-gray-300 rounded"></div>
                </div>
                <div className="h-12 border-2 border-gray-300 rounded flex items-center justify-between px-3">
                  <div className="h-3 w-36 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="h-12 border-2 border-gray-300 rounded flex items-center justify-between px-3">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="w-6 h-6 border border-gray-300 rounded"></div>
                </div>
              </div>

              {/* Logout button */}
              <div className="h-12 bg-red-100 border-2 border-red-300 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-red-700">LOGOUT</span>
              </div>
            </div>
          </div>

          {/* Savings Calculator Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 7</div>
              <h3 className="font-bold text-lg">Savings Calculator</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                <div className="h-5 w-36 bg-gray-200 rounded"></div>
              </div>

              {/* Savings card */}
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                <div className="text-center space-y-3">
                  <div className="h-4 w-32 bg-green-300 rounded mx-auto"></div>
                  <div className="h-8 w-24 bg-green-400 rounded mx-auto"></div>
                  <div className="h-3 w-40 bg-green-200 rounded mx-auto"></div>
                </div>
              </div>

              {/* Comparison */}
              <div className="flex gap-3">
                <div className="flex-1 border-2 border-gray-300 rounded p-3 text-center">
                  <div className="h-3 w-16 bg-gray-200 rounded mx-auto mb-2"></div>
                  <div className="h-6 w-12 bg-gray-300 rounded mx-auto"></div>
                </div>
                <div className="flex-1 border-2 border-blue-300 rounded p-3 text-center bg-blue-50">
                  <div className="h-3 w-16 bg-blue-200 rounded mx-auto mb-2"></div>
                  <div className="h-6 w-12 bg-blue-300 rounded mx-auto"></div>
                </div>
              </div>

              {/* Progress */}
              <div className="border-2 border-gray-300 rounded p-3">
                <div className="h-3 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-green-400"></div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="h-2 w-12 bg-gray-200 rounded"></div>
                  <div className="h-2 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="border-2 border-gray-300 rounded p-3">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="border-2 border-gray-300 rounded p-3">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Tips section */}
              <div className="border-2 border-blue-300 bg-blue-50 rounded p-3">
                <div className="h-3 w-28 bg-blue-300 rounded mb-2"></div>
                <div className="space-y-1">
                  <div className="h-2 w-full bg-blue-200 rounded"></div>
                  <div className="h-2 w-5/6 bg-blue-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 8</div>
              <h3 className="font-bold text-lg">Help & Support</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                <div className="h-5 w-28 bg-gray-200 rounded"></div>
              </div>

              {/* Search bar */}
              <div className="h-10 border-2 border-gray-300 rounded flex items-center px-3 gap-2">
                <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </div>

              {/* FAQ sections */}
              <div className="flex-1 space-y-2 overflow-hidden">
                <div className="border-2 border-gray-300 rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 border border-gray-300"></div>
                  </div>
                </div>
                <div className="border-2 border-blue-300 bg-blue-50 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-40 bg-blue-300 rounded"></div>
                    <div className="w-4 h-4 bg-blue-300"></div>
                  </div>
                  <div className="space-y-1 pl-2">
                    <div className="h-3 w-full bg-blue-200 rounded"></div>
                    <div className="h-3 w-5/6 bg-blue-200 rounded"></div>
                    <div className="h-3 w-4/6 bg-blue-200 rounded"></div>
                  </div>
                </div>
                <div className="border-2 border-gray-300 rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-44 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 border border-gray-300"></div>
                  </div>
                </div>
                <div className="border-2 border-gray-300 rounded p-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-36 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 border border-gray-300"></div>
                  </div>
                </div>
              </div>

              {/* Contact support */}
              <div className="h-12 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-700">CONTACT SUPPORT</span>
              </div>
            </div>
          </div>

          {/* Limit Settings Screen */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
            <div className="text-center mb-4">
              <div className="text-sm font-semibold text-gray-500 mb-2">SCREEN 9</div>
              <h3 className="font-bold text-lg">Set Monthly Limit</h3>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 h-[500px] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                <div className="h-5 w-36 bg-gray-200 rounded"></div>
              </div>

              {/* Info card */}
              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-blue-300 rounded"></div>
                  <div className="h-3 w-5/6 bg-blue-200 rounded"></div>
                  <div className="h-3 w-4/6 bg-blue-200 rounded"></div>
                </div>
              </div>

              {/* Current limit display */}
              <div className="text-center border-2 border-gray-300 rounded-lg p-4">
                <div className="h-3 w-24 bg-gray-200 rounded mx-auto mb-3"></div>
                <div className="h-10 w-20 bg-gray-300 rounded mx-auto"></div>
              </div>

              {/* Slider */}
              <div className="space-y-3">
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-300 rounded-full relative">
                  <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-blue-400 border-2 border-blue-600 rounded-full -translate-y-1/2"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-2 w-8 bg-gray-200 rounded"></div>
                  <div className="h-2 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Quick presets */}
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 border-2 border-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">20 m³</span>
                </div>
                <div className="h-10 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-700">30 m³</span>
                </div>
                <div className="h-10 border-2 border-gray-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">40 m³</span>
                </div>
              </div>

              {/* Tariff setting */}
              <div className="space-y-2">
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                <div className="h-12 border-2 border-gray-300 rounded flex items-center px-3 justify-between">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  <div className="w-4 h-4 border border-gray-300"></div>
                </div>
              </div>

              {/* Save button */}
              <div className="h-12 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-700">SAVE SETTINGS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
          <h3 className="font-bold text-lg mb-4">Wireframe Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-gray-300 rounded bg-white"></div>
              <span className="text-sm">Input Field</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-200 border-2 border-blue-400 rounded"></div>
              <span className="text-sm">Primary Button</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <span className="text-sm">Text/Label</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-dashed border-gray-400 rounded"></div>
              <span className="text-sm">Media/Chart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
