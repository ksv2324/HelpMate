import { useState } from 'react';
import { MapPin, Heart, Gift, Navigation, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChatBox } from '../chat';
import { useLanguage } from '../shared/LanguageContext';

const mapMarkers = [
  { id: '1', x: 35, y: 45, type: 'donation', title: 'Fresh Vegetables', user: 'Priya Sharma', distance: '0.8 km' },
  { id: '2', x: 60, y: 30, type: 'request', title: 'Warm Blankets', user: 'Ravi Kumar', distance: '0.5 km' },
  { id: '3', x: 25, y: 65, type: 'donation', title: 'Winter Clothes', user: '', distance: '1.2 km' },
  { id: '4', x: 70, y: 55, type: 'request', title: 'School Books', user: '', distance: '1.1 km' },
  { id: '5', x: 45, y: 40, type: 'donation', title: 'Home-Cooked Meals', user: 'Anjali Patel', distance: '1.5 km' },
  { id: '6', x: 55, y: 70, type: 'request', title: 'Rice & Groceries', user: 'Lakshmi Reddy', distance: '1.4 km' },
];

export default function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState<typeof mapMarkers[0] | null>(null);
  const [acceptedMarkers, setAcceptedMarkers] = useState<Set<string>>(new Set());
  const [chatMarker, setChatMarker] = useState<typeof mapMarkers[0] | null>(null);
  const { t } = useLanguage();

  const handleAccept = (marker: typeof mapMarkers[0]) => {
    setAcceptedMarkers(new Set([...acceptedMarkers, marker.id]));
    setChatMarker(marker);
    setSelectedMarker(null);
  };

  if (chatMarker) {
    return (
      <ChatBox
        item={{
          id: chatMarker.id,
          image: 'https://images.unsplash.com/photo-1639677439462-477634bd1d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJpZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2MDcxMTk4OHww&ixlib=rb-4.1.0&q=80&w=1080',
          title: chatMarker.title,
          donor: chatMarker.type === 'donation' ? chatMarker.user : undefined,
          requester: chatMarker.type === 'request' ? chatMarker.user : undefined,
          location: 'Bangalore',
          distance: chatMarker.distance,
          description: 'Description of the item'
        }}
        type={chatMarker.type}
        onClose={() => setChatMarker(null)}
      />
    );
  }

  return (
    <div className="h-full bg-white relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Grid pattern */}
        <svg className="w-full h-full" style={{ opacity: 0.3 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Streets */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#999" strokeWidth="3" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#999" strokeWidth="2" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#999" strokeWidth="3" />
          <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#999" strokeWidth="2" />
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg z-10">
        <p className="text-gray-900 mb-2">Legend</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4c6ef5] rounded-full" />
            <span className="text-gray-700">{t.donation}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full" />
            <span className="text-gray-700">{t.request}</span>
          </div>
        </div>
      </div>

      {/* Radius Info */}
      <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg z-10">
        <p className="text-gray-900">Within 2 km radius</p>
      </div>

      {/* Current Location Button */}
      <button className="absolute bottom-24 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
        <Navigation className="w-6 h-6 text-[#4c6ef5]" />
      </button>

      {/* Map Markers */}
      {mapMarkers.map((marker) => (
        <button
          key={marker.id}
          onClick={() => setSelectedMarker(marker)}
          className="absolute transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform z-20"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <div className="relative">
            <div className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${
              marker.type === 'donation' ? 'bg-[#4c6ef5]' : 'bg-green-600'
            }`}>
              {marker.type === 'donation' ? (
                <Heart className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Gift className="w-5 h-5 text-white" fill="white" />
              )}
            </div>
            <div className={`w-1 h-3 mx-auto ${
              marker.type === 'donation' ? 'bg-[#4c6ef5]' : 'bg-green-600'
            }`} />
          </div>
        </button>
      ))}

      {/* Current location */}
      <div className="absolute z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
          <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75" />
        </div>
      </div>

      {/* Selected Marker Overlay */}
      {selectedMarker && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-5 border-t border-gray-200 z-30 animate-in slide-in-from-bottom">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Badge className={`mb-2 ${
                selectedMarker.type === 'donation' ? 'bg-[#4c6ef5]' : 'bg-green-600'
              } text-white border-0`}>
                {selectedMarker.type === 'donation' ? (
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
              <h3 className="text-gray-900 mb-1">{selectedMarker.title}</h3>
              <p className="text-gray-600 mb-2">by {selectedMarker.user || t.anonymous}</p>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{selectedMarker.distance} away</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="space-y-2">
            {!acceptedMarkers.has(selectedMarker.id) ? (
              <Button 
                onClick={() => handleAccept(selectedMarker)}
                className={`w-full h-11 text-white ${
                  selectedMarker.type === 'donation' 
                    ? 'bg-[#4c6ef5] hover:bg-[#4263eb]' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {t.acceptChat}
              </Button>
            ) : (
              <Button 
                onClick={() => setChatMarker(selectedMarker)}
                className={`w-full h-11 text-white ${
                  selectedMarker.type === 'donation' 
                    ? 'bg-[#4c6ef5] hover:bg-[#4263eb]' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Open Chat
              </Button>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-11"
              >
                {t.viewDetails}
              </Button>
              <Button
                variant="outline"
                className="h-11"
              >
                {t.getDirections}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
