import { ArrowLeft, Heart, Gift, MapPin, Bell, CheckCircle } from 'lucide-react';

interface NotificationsPageProps {
  onBack: () => void;
}

const notifications = [
  {
    id: '1',
    type: 'nearby-request',
    icon: Gift,
    title: 'New request nearby',
    message: 'Priya Sharma needs fresh vegetables in Koramangala (0.8 km away)',
    time: '10 minutes ago',
    isNew: true
  },
  {
    id: '2',
    type: 'nearby-donation',
    icon: Heart,
    title: 'Donation available nearby',
    message: 'Rajesh Kumar has winter clothes to donate in Indiranagar (1.2 km away)',
    time: '25 minutes ago',
    isNew: true
  },
  {
    id: '3',
    type: 'accepted',
    icon: CheckCircle,
    title: 'Your request was accepted',
    message: 'Amit Singh accepted your request for school books. Check your chat.',
    time: '1 hour ago',
    isNew: true
  },
  {
    id: '4',
    type: 'nearby-request',
    icon: Gift,
    title: 'New request nearby',
    message: 'Meena Reddy needs school supplies in Whitefield (1.8 km away)',
    time: '2 hours ago',
    isNew: false
  },
  {
    id: '5',
    type: 'message',
    icon: Bell,
    title: 'New message',
    message: 'You have a new message from Anjali Patel about your donation',
    time: '3 hours ago',
    isNew: false
  },
  {
    id: '6',
    type: 'nearby-donation',
    icon: Heart,
    title: 'Donation available nearby',
    message: 'Kumar has cooked food to donate in HSR Layout (1.5 km away)',
    time: '5 hours ago',
    isNew: false
  }
];

const iconColors: { [key: string]: string } = {
  'nearby-request': 'bg-pink-500',
  'nearby-donation': 'bg-[#4c6ef5]',
  'accepted': 'bg-green-500',
  'message': 'bg-orange-500'
};

export default function NotificationsPage({ onBack }: NotificationsPageProps) {
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
          <h1 className="text-gray-900">Notifications</h1>
        </div>
      </div>

      {/* Nearby Activity Banner */}
      <div className="p-4 bg-blue-50 border-b border-blue-200">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-gray-900 mb-1">Nearby Activity (1-2 km radius)</h3>
            <p className="text-gray-600">
              We'll notify you when new donations or requests are posted near your location
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <button
                key={notification.id}
                className={`w-full px-4 py-4 hover:bg-gray-50 transition-colors text-left ${
                  notification.isNew ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 ${iconColors[notification.type]} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{notification.title}</h3>
                      {notification.isNew && (
                        <div className="w-2 h-2 bg-[#4c6ef5] rounded-full" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
