import { ArrowLeft, User, Mail, Phone, Award, Heart, Settings, LogOut, Globe, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import type { Screen } from '../../App';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function ProfileScreen({ onBack, onNavigate }: ProfileScreenProps) {
  return (
    <div className="h-full bg-white flex flex-col w-screen">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Profile Info */}
        <div className="px-6 py-8 text-center border-b border-gray-200">
          <div className="w-24 h-24 bg-[#4c6ef5] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-gray-900 mb-1">Alex Johnson</h2>
          <p className="text-gray-600">Member since October 2024</p>
        </div>

        {/* Contact Info */}
        <div className="px-6 py-6 border-b border-gray-200">
          <h3 className="text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-900">alex.johnson@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-6 border-b border-gray-200">
          <h3 className="text-gray-900 mb-4">Your Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#4c6ef5] to-[#7950f2] rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/80">Bonus Points</p>
              <p className="text-white text-2xl mt-1">485</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/80">Total Donated</p>
              <p className="text-white text-2xl mt-1">$1,240</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <User className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/80">People Helped</p>
              <p className="text-white text-2xl mt-1">12</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/80">Countries</p>
              <p className="text-white text-2xl mt-1">3</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="px-6 py-6">
          <h3 className="text-gray-900 mb-4">Settings</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Account Settings</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Notifications</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Language & Region</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Payment Methods</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <Button
          variant="outline"
          className="w-full h-12 text-red-600 border-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
