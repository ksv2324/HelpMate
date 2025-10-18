import { useState } from 'react';
import { Heart, Plus, MapPin, Bell, User, Award, Clock, Globe } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { Screen } from '../../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onSelectDonation: (id: string) => void;
}

const donationRequests = [
  {
    id: '1',
    title: 'Emergency Food Support',
    description: 'Single parent needing groceries for the week. Any help is appreciated.',
    target: 150,
    collected: 95,
    eta: '2 days left',
    isInternational: false,
    bonusPoints: 50,
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb258ZW58MXx8fHwxNzYwNjg3MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: '1.2 km away'
  },
  {
    id: '2',
    title: 'Textbooks for Engineering Student',
    description: 'International student needs required textbooks for this semester.',
    target: 300,
    collected: 120,
    eta: '5 days left',
    isInternational: true,
    bonusPoints: 75,
    image: 'https://images.unsplash.com/photo-1514369118554-e20d93546b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzYwNjk0MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: '3.5 km away'
  },
  {
    id: '3',
    title: 'Medical Supplies Needed',
    description: 'Elderly person needs help covering prescription medication costs.',
    target: 200,
    collected: 180,
    eta: '1 day left',
    isInternational: false,
    bonusPoints: 60,
    image: 'https://images.unsplash.com/photo-1605176173609-a0067079b419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3VwcGxpZXN8ZW58MXx8fHwxNzYwNjgwNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: '0.8 km away'
  },
  {
    id: '4',
    title: 'Winter Clothing Drive',
    description: 'Community center collecting warm clothes for homeless shelter.',
    target: 500,
    collected: 340,
    eta: '7 days left',
    isInternational: false,
    bonusPoints: 100,
    image: 'https://images.unsplash.com/photo-1634839593004-667d278bac49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWxwfGVufDF8fHx8MTc2MDcxNTg2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: '2.1 km away'
  }
];

export default function HomeScreen({ onNavigate, onSelectDonation }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'nearby' | 'international'>('all');

  const filteredRequests = donationRequests.filter(request => {
    if (activeTab === 'international') return request.isInternational;
    if (activeTab === 'nearby') return parseFloat(request.location) < 2;
    return true;
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4c6ef5] rounded-xl flex items-center justify-center shadow-sm">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <h1 className="text-gray-900">Hand2Hand</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('notifications')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Bonus Points */}
        <div className="bg-gradient-to-r from-[#4c6ef5] to-[#7950f2] rounded-2xl p-4 mb-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80">Your Bonus Points</p>
              <p className="text-white text-3xl mt-1">485</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-[#4c6ef5] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('nearby')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'nearby'
                ? 'bg-[#4c6ef5] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Nearby
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'international'
                ? 'bg-[#4c6ef5] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Globe className="w-4 h-4 inline mr-1" />
            International
          </button>
        </div>
      </div>

      {/* Donation Cards */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="space-y-4 pb-20">
          {filteredRequests.map((request) => (
            <button
              key={request.id}
              onClick={() => onSelectDonation(request.id)}
              className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-left"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={request.image}
                  alt={request.title}
                  className="w-full h-full object-cover"
                />
                {request.isInternational && (
                  <Badge className="absolute top-3 right-3 bg-[#7950f2] text-white border-0 shadow-md">
                    <Globe className="w-3 h-3 mr-1" />
                    International Student
                  </Badge>
                )}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>+{request.bonusPoints}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-1">{request.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{request.description}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">${request.collected} raised</span>
                    <span className="text-gray-500">${request.target} goal</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4c6ef5] rounded-full transition-all"
                      style={{ width: `${(request.collected / request.target) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{request.eta}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-[#4c6ef5]">
            <Heart className="w-6 h-6" fill="#4c6ef5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>
          <button
            onClick={() => onNavigate('international-hub')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Globe className="w-6 h-6" />
            <span className="text-xs">Hub</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => onNavigate('create-donation')}
        className="absolute bottom-24 right-6 w-14 h-14 bg-[#4c6ef5] rounded-full flex items-center justify-center shadow-lg hover:bg-[#4263eb] transition-colors"
      >
        <Plus className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}
