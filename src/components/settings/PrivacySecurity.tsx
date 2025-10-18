import { ArrowLeft, Lock, Eye, MapPin, Shield } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface PrivacySecurityProps {
  onBack: () => void;
}

export default function PrivacySecurity({ onBack }: PrivacySecurityProps) {
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
          <h1 className="text-gray-900">Privacy & Security</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="space-y-6">
          {/* Account Security */}
          <div>
            <h3 className="text-gray-900 mb-4">Account Security</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 justify-start">
                <Lock className="w-5 h-5 mr-3 text-gray-600" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full h-12 justify-start">
                <Shield className="w-5 h-5 mr-3 text-gray-600" />
                Two-Factor Authentication
              </Button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <h3 className="text-gray-900 mb-4">Privacy Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3 flex-1">
                  <Eye className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <Label className="text-gray-900 cursor-pointer">Profile Visibility</Label>
                    <p className="text-gray-600 mt-1">
                      Make my profile visible to other users
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3 flex-1">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <Label className="text-gray-900 cursor-pointer">Share Location</Label>
                    <p className="text-gray-600 mt-1">
                      Show my approximate location to nearby donors
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div>
            <h3 className="text-gray-900 mb-4">Data & Privacy</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 justify-start">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full h-12 justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>

          {/* Privacy Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-gray-900 mb-2">Your Privacy Matters</h4>
            <p className="text-gray-700">
              Hand-to-Hand takes your privacy seriously. We only share your information with users you choose to interact with. Your exact location is never shared - only approximate distance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
