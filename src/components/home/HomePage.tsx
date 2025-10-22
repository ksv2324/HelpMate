import { Heart, Gift, MapPin, Bell, Info, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { useLanguage } from '../shared/LanguageContext';
import { ScreenContainer } from '../shared';

const latestActivity = [
  {
    id: '1',
    type: 'donation',
    image: 'https://images.unsplash.com/photo-1639677439462-477634bd1d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJpZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2MDcxMTk4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Fresh Vegetables & Fruits',
    user: 'Priya Sharma',
    location: 'Koramangala',
    distance: '0.8 km',
    time: '5 mins ago'
  },
  {
    id: '2',
    type: 'request',
    image: 'https://images.unsplash.com/photo-1672975506913-156aa3fee594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFua2V0JTIwd2FybXxlbnwxfHx8fDE3NjA3MTk1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Warm Blankets Needed',
    user: 'Ravi Kumar',
    location: 'Koramangala',
    distance: '0.5 km',
    time: '12 mins ago'
  },
  {
    id: '3',
    type: 'donation',
    image: 'https://images.unsplash.com/photo-1732279657430-3375a7cb205c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjbG90aGVzJTIwamFja2V0fGVufDF8fHx8MTc2MDcxNjg1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Winter Clothes Bundle',
    user: '',
    location: 'Indiranagar',
    distance: '1.2 km',
    time: '25 mins ago'
  },
  {
    id: '4',
    type: 'request',
    image: 'https://images.unsplash.com/photo-1598306927075-aea230464a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHRleHRib29rc3xlbnwxfHx8fDE3NjA2MDU5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'School Books for Grade 8',
    user: '',
    location: 'Indiranagar',
    distance: '1.1 km',
    time: '30 mins ago'
  }
];

const nearbyNotifications = [
  { id: '1', message: 'Priya donated fresh vegetables in Koramangala (0.8 km)', time: '5 mins ago', isNew: true },
  { id: '2', message: 'Ravi needs warm blankets in Koramangala (0.5 km)', time: '12 mins ago', isNew: true },
  { id: '3', message: 'Anonymous donated winter clothes in Indiranagar (1.2 km)', time: '25 mins ago', isNew: false },
  { id: '4', message: 'Anonymous needs school books in Indiranagar (1.1 km)', time: '30 mins ago', isNew: false }
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <ScreenContainer className="bg-gray-50">
      <div className="h-full overflow-auto min-w-0">
      {/* Welcome Section */}
      <div className="p-4">
        <div className="bg-linear-to-r from-[#4c6ef5] to-[#7950f2] rounded-2xl p-5 text-white shadow-md mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="mb-1">Welcome to HelpMate</h2>
              <p className="text-white/90">
                {t.welcomeMessage}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white/80">Active {t.donation}s</p>
              <p className="text-white text-2xl">28</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-white/80">Active {t.request}s</p>
              <p className="text-white text-2xl">16</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-gray-900 mb-1">{t.howItWorks}</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Browse donations and requests nearby (1-2 km)</li>
                <li>• Accept items to unlock chat</li>
                <li>• Donate or request items you need</li>
                <li>• View everything on the map</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Activity Notifications */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-5 h-5 text-gray-700" />
          <h3 className="text-gray-900">Nearby Activity (1-2 km)</h3>
          <Badge className="bg-red-500 text-white border-0 ml-auto">
            {nearbyNotifications.filter(n => n.isNew).length} New
          </Badge>
        </div>
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          {nearbyNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 hover:bg-gray-50 transition-colors ${notif.isNew ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{notif.message}</p>
                  <p className="text-gray-500">{notif.time}</p>
                </div>
                {notif.isNew && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Activity */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-gray-700" />
          <h3 className="text-gray-900">{t.latestActivity}</h3>
        </div>
        <div className="space-y-4">
          {latestActivity.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-3 left-3 ${
                  item.type === 'donation' ? 'bg-[#4c6ef5]' : 'bg-green-600'
                } text-white border-0 shadow-md`}>
                  {item.type === 'donation' ? (
                    <>
                      <Heart className="w-3 h-3 mr-1" />
                      {t.donation}
                    </>
                  ) : (
                    <>
                      <Gift className="w-3 h-3 mr-1" />
                      {t.request}
                    </>
                  )}
                </Badge>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.distance}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 mb-2">by {item.user || t.anonymous}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <span className="text-gray-400">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </ScreenContainer>
  );
}
