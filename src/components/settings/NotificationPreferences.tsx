import { ArrowLeft, Bell, MapPin, Heart, MessageCircle } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface NotificationPreferencesProps {
  onBack: () => void;
}

export default function NotificationPreferences({ onBack }: NotificationPreferencesProps) {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">Notification Preferences</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="space-y-6">
          {/* Push Notifications */}
          <div>
            <h3 className="text-gray-900 mb-4">Push Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3 flex-1">
                  <Bell className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <Label className="text-gray-900 cursor-pointer">All Notifications</Label>
                    <p className="text-gray-600 mt-1">
                      Enable or disable all push notifications
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Donation Notifications */}
          <div>
            <h3 className="text-gray-900 mb-4">Donation Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3 flex-1">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <Label className="text-gray-900 cursor-pointer">Nearby Donations</Label>
                    <p className="text-gray-600 mt-1">
                      Alert me when new donations are posted within 2 km
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3 flex-1">
                  <Heart className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <Label className="text-gray-900 cursor-pointer">My Donations</Label>
                    <p className="text-gray-600 mt-1">
                      Notify when someone accepts my donation
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Chat Notifications */}
          <div>
            <h3 className="text-gray-900 mb-4">Chat & Messages</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3 flex-1">
                  <MessageCircle className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <Label className="text-gray-900 cursor-pointer">New Messages</Label>
                    <p className="text-gray-600 mt-1">
                      Alert me when I receive new chat messages
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Distance Settings */}
          <div>
            <h3 className="text-gray-900 mb-4">Distance Preferences</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-gray-700 mb-2">
                <strong>Current Radius:</strong> 2 km
              </p>
              <p className="text-gray-600">
                You'll receive notifications for donations and activity within 2 kilometers of your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
