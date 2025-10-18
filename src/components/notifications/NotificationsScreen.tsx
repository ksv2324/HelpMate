import { ArrowLeft, Heart, Award, Bell, Globe, CheckCircle } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'donation',
    icon: Heart,
    title: 'New donation received',
    message: 'Sarah M. donated $25 to your "Emergency Food Support" request',
    time: '5 minutes ago',
    isNew: true
  },
  {
    id: 2,
    type: 'points',
    icon: Award,
    title: 'Bonus points earned!',
    message: 'You earned 50 bonus points for helping John with groceries',
    time: '1 hour ago',
    isNew: true
  },
  {
    id: 3,
    type: 'goal',
    icon: CheckCircle,
    title: 'Goal reached!',
    message: 'Your "Medical Supplies" request has reached its funding goal',
    time: '3 hours ago',
    isNew: false
  },
  {
    id: 4,
    type: 'international',
    icon: Globe,
    title: 'International student verified',
    message: 'Your student verification has been approved. You can now access additional support options.',
    time: '1 day ago',
    isNew: false
  },
  {
    id: 5,
    type: 'donation',
    icon: Heart,
    title: 'Someone needs help nearby',
    message: 'A new donation request "Winter Clothing Drive" has been posted 1.2 km away',
    time: '2 days ago',
    isNew: false
  },
  {
    id: 6,
    type: 'reminder',
    icon: Bell,
    title: 'Request expiring soon',
    message: 'Your "Textbooks for Engineering" request expires in 2 days',
    time: '3 days ago',
    isNew: false
  }
];

const iconColors: { [key: string]: string } = {
  donation: 'bg-pink-500',
  points: 'bg-[#4c6ef5]',
  goal: 'bg-green-500',
  international: 'bg-[#7950f2]',
  reminder: 'bg-orange-500'
};

export default function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">Notifications</h1>
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
                className={`w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left ${
                  notification.isNew ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex gap-4">
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
