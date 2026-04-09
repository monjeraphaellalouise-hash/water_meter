import React from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Camera, Calendar, Bell, BarChart3, PiggyBank, Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/20 rounded">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Help & Guide</h1>
        </div>
        <p className="text-blue-100 text-sm ml-10">Learn how to use AquaMeter</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Quick Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FeatureGuide
              icon={<Camera className="w-5 h-5 text-blue-600" />}
              title="Daily Check"
              description="Take a photo of your water meter daily to track consumption. This is for awareness only and doesn't affect billing or notifications."
            />
            <FeatureGuide
              icon={<Calendar className="w-5 h-5 text-green-600" />}
              title="Weekly Upload"
              description="Upload your meter reading weekly. This is the official reading used for billing, alerts, and savings calculation."
            />
            <FeatureGuide
              icon={<Bell className="w-5 h-5 text-orange-600" />}
              title="Notifications"
              description="Get alerts when you're approaching or exceeding your monthly water limit based on weekly uploads."
            />
            <FeatureGuide
              icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
              title="Usage History"
              description="View charts and trends of your daily and weekly water consumption over time."
            />
            <FeatureGuide
              icon={<PiggyBank className="w-5 h-5 text-emerald-600" />}
              title="Savings"
              description="See how much water and money you've saved by staying below your monthly limit."
            />
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I add a Weekly Upload?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="font-semibold">Step-by-step:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Go to Dashboard and tap "Weekly Upload" button</li>
                      <li>Take a clear photo of your water meter</li>
                      <li>Manually type the meter reading (numbers shown on meter)</li>
                      <li>Tap "Submit" to save the reading permanently</li>
                    </ol>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-blue-900 mb-2">📷 Example:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-blue-800">
                        <li>Your meter shows: <span className="font-bold">123.45</span></li>
                        <li>Take a photo of the meter display</li>
                        <li>Type <span className="font-bold">123.45</span> in the "Meter Reading" field</li>
                        <li>The photo is saved as proof, the number is used for calculation</li>
                      </ul>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">💡 The app doesn't read the numbers automatically - you must type them yourself. The photo is for visual proof only.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How is my monthly water usage calculated?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="font-semibold">4-Week Billing Cycle (Richli Water / Bohol Water standard):</p>
                    <p>Your monthly consumption = <span className="font-semibold text-blue-600">Week 4 reading - Week 1 reading</span></p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-green-900 mb-2">📊 Complete Example:</p>
                      <div className="space-y-1 text-xs text-green-800">
                        <p>🗓️ <span className="font-semibold">Week 1 (Jan 1):</span> 100.0 m³ → Starting reading</p>
                        <p>🗓️ <span className="font-semibold">Week 2 (Jan 8):</span> 105.5 m³ → Used 5.5 m³ this week</p>
                        <p>🗓️ <span className="font-semibold">Week 3 (Jan 15):</span> 112.3 m³ → Used 6.8 m³ this week</p>
                        <p>🗓️ <span className="font-semibold">Week 4 (Jan 22):</span> 118.0 m³ → Used 5.7 m³ this week</p>
                        <div className="border-t border-green-300 my-2 pt-2">
                          <p className="font-bold text-green-600">✅ Monthly Total = 118.0 - 100.0 = 18.0 m³</p>
                          <p className="text-xs text-green-700 mt-1">This is what appears on your bill and triggers notifications!</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">This matches real water utility billing practices where 4 weeks = 1 billing cycle.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What's the difference between Daily Check and Weekly Upload?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="font-semibold text-blue-600">📱 Daily Check:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                      <li>❌ NOT saved permanently</li>
                      <li>❌ NOT used for billing</li>
                      <li>❌ Does NOT trigger notifications</li>
                      <li>✅ For instant awareness only</li>
                    </ul>
                    <p className="font-semibold text-green-600 mt-3">📅 Weekly Upload:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                      <li>✅ Saved permanently with photo</li>
                      <li>✅ Used for monthly billing calculation</li>
                      <li>✅ Triggers notifications if limit exceeded</li>
                      <li>✅ Counts toward 4-week billing cycle</li>
                    </ul>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-purple-900 mb-2">🔍 Real-Life Example:</p>
                      <div className="space-y-1 text-xs text-purple-800">
                        <p><span className="font-semibold">Monday:</span> Daily Check shows 105.2 m³ (just to see usage)</p>
                        <p><span className="font-semibold">Tuesday:</span> Daily Check shows 105.8 m³ (used 0.6 m³)</p>
                        <p><span className="font-semibold">Wednesday:</span> Daily Check shows 106.5 m³ (used 0.7 m³)</p>
                        <p className="pt-2 border-t border-purple-300"><span className="font-semibold text-green-600">Sunday (End of Week):</span> Weekly Upload 107.0 m³ ✅</p>
                        <p className="text-xs text-purple-700 mt-1">→ Only the Sunday upload counts for billing! Daily checks help you monitor in between.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>When do I get notifications?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="font-semibold">You'll receive notifications in these situations:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2 text-xs">
                      <li><span className="font-semibold text-orange-600">⚠️ 80% Warning:</span> When you reach 80% of your monthly limit</li>
                      <li><span className="font-semibold text-red-600">🚨 Limit Exceeded:</span> When your usage goes over your monthly limit (after Week 4)</li>
                      <li><span className="font-semibold text-green-600">🎉 Congratulations:</span> When you complete 4 weeks and stay under your limit</li>
                      <li><span className="font-semibold text-blue-600">📅 Upload Reminder:</span> If you haven't uploaded for 7+ days</li>
                    </ol>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-orange-900 mb-2">🔔 Example Scenario:</p>
                      <div className="space-y-1 text-xs text-orange-800">
                        <p><span className="font-semibold">Your Limit:</span> 20 m³/month</p>
                        <p className="pt-1"><span className="font-semibold">Week 3 Upload:</span> 16.5 m³ used (82.5%)</p>
                        <p className="text-orange-600">→ ⚠️ Warning notification: "You're at 82.5% of your limit!"</p>
                        <p className="pt-2"><span className="font-semibold">Week 4 Upload:</span> 22.0 m³ used (110%)</p>
                        <p className="text-red-600">→ 🚨 Alert notification: "You've exceeded your limit by 2.0 m³"</p>
                        <p className="pt-2 text-xs text-gray-600">If you had stayed under 20 m³, you'd get 🎉 congratulations instead!</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">All notifications are based on Weekly Uploads only, not Daily Checks.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I set my water tariff rate?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p>Go to Settings → Water Usage Settings. Enter your cost per cubic meter (m³) based on your water provider's rate.</p>
                    <p className="text-xs font-semibold mt-2">Sample rates:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                      <li>Richli Water: ₱45-55/m³</li>
                      <li>Bohol Water Utilities: ₱40-50/m³</li>
                    </ul>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-blue-900 mb-2">💡 How to find your rate:</p>
                      <p className="text-xs text-blue-800">Check your latest water bill → Look for "Rate per m³" or "Price per cubic meter"</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How is my monthly bill calculated?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p className="font-semibold">Formula:</p>
                    <p className="text-blue-600">Monthly Bill = Monthly Consumption × Tariff Rate</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-green-900 mb-2">💰 Step-by-Step Example:</p>
                      <div className="space-y-1 text-xs text-green-800">
                        <p>1️⃣ <span className="font-semibold">Monthly consumption:</span> 18.0 m³ (Week 4 - Week 1)</p>
                        <p>2️⃣ <span className="font-semibold">Your tariff rate:</span> ₱50.00 per m³</p>
                        <p>3️⃣ <span className="font-semibold">Calculation:</span> 18.0 m³ × ₱50.00 = ₱900.00</p>
                        <p className="font-bold text-green-600 pt-2 border-t border-green-300">💵 Estimated Bill: ₱900.00</p>
                        <p className="text-xs text-gray-600 mt-1">Note: This is an estimate. Actual bills may include other fees.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>What does the Savings show?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p>If you use less than your monthly limit, the app shows:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                      <li><span className="font-semibold">Water saved:</span> Difference between limit and actual usage</li>
                      <li><span className="font-semibold">Money saved:</span> Water saved × your tariff rate</li>
                    </ul>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-emerald-900 mb-2">🌊 Savings Example:</p>
                      <div className="space-y-1 text-xs text-emerald-800">
                        <p><span className="font-semibold">Your limit:</span> 20 m³</p>
                        <p><span className="font-semibold">You used:</span> 18 m³</p>
                        <p><span className="font-semibold">Tariff rate:</span> ₱50/m³</p>
                        <div className="border-t border-emerald-300 my-2 pt-2">
                          <p className="font-bold text-emerald-600">💧 Water saved: 20 - 18 = 2 m³</p>
                          <p className="font-bold text-emerald-600">💵 Money saved: 2 m³ × ₱50 = ₱100.00</p>
                        </div>
                        <p className="text-xs text-emerald-700">Great job conserving water! 🎉</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>How do I read my water meter?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p>Look for the numbers on your water meter display. These numbers represent cubic meters (m³).</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                      <li>Record ALL digits including decimals (e.g., 123.45)</li>
                      <li>The reading should always be HIGHER than your previous reading</li>
                      <li>Water meters are cumulative - they never reset</li>
                    </ul>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-blue-900 mb-2">📖 Reading Example:</p>
                      <div className="space-y-1 text-xs text-blue-800">
                        <p><span className="font-semibold">Your meter shows:</span> <span className="font-mono text-lg">0 1 2 3 4 5</span></p>
                        <p><span className="font-semibold">You write:</span> 123.45 m³</p>
                        <p className="pt-2 text-xs text-red-600">❌ Wrong: 12.345 or 1234.5</p>
                        <p className="text-xs text-green-600">✅ Correct: 123.45</p>
                        <p className="pt-2 text-gray-600">Tip: The last 2 digits are usually decimals (red numbers on some meters)</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>What happens when I complete 4 weeks?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  <div className="space-y-2">
                    <p>After you upload Week 4:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
                      <li>Your monthly usage is calculated (Week 4 - Week 1)</li>
                      <li>You receive a notification (congratulations or alert)</li>
                      <li>The "Weekly Upload Reminder" card disappears</li>
                      <li>You can start a new 4-week cycle next month</li>
                    </ol>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
                      <p className="text-xs font-semibold text-purple-900 mb-2">🔄 Cycle Example:</p>
                      <div className="space-y-1 text-xs text-purple-800">
                        <p className="font-semibold">January Cycle:</p>
                        <p>✅ Week 1, 2, 3, 4 uploaded → Month complete!</p>
                        <p className="text-green-600">→ 🎉 Notification sent</p>
                        <p className="pt-2 font-semibold">February Cycle:</p>
                        <p>📅 Upload Week 1 of February → New cycle starts automatically</p>
                        <p className="text-gray-600">→ Counter resets to Week 1/4</p>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">💡 The cycle automatically resets when you upload Week 1 of the next month.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Tips for Best Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Take clear photos of your meter in good lighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Set a realistic monthly limit based on your household size</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Upload weekly readings consistently on the same day each week</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Check daily consumption to identify days with high usage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 flex-shrink-0">•</span>
                <span>Review your usage history to spot trends and patterns</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FeatureGuide = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);