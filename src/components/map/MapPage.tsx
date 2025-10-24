import { useState } from 'react';
import { MapPin, Heart, Gift, Navigation, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChatBox } from '../chat';
import { useLanguage } from '../shared/LanguageContext';
import { ScreenContainer } from '../shared';
import LeafletMap, { MapMarker } from './LeafletMap';

// Bangalore coordinates (Koramangala area)
const BANGALORE_CENTER: [number, number] = [12.9352, 77.6245];

// Convert markers to use real coordinates near Bangalore
const mapMarkers: MapMarker[] = [
  { id: '1', lat: 12.9365, lng: 77.6278, type: 'donation', title: 'Fresh Vegetables', user: 'Priya Sharma', distance: '0.8 km' },
  { id: '2', lat: 12.9385, lng: 77.6210, type: 'request', title: 'Warm Blankets', user: 'Ravi Kumar', distance: '0.5 km' },
  { id: '3', lat: 12.9320, lng: 77.6300, type: 'donation', title: 'Winter Clothes', user: '', distance: '1.2 km' },
  { id: '4', lat: 12.9390, lng: 77.6275, type: 'request', title: 'School Books', user: '', distance: '1.1 km' },
  { id: '5', lat: 12.9355, lng: 77.6235, type: 'donation', title: 'Home-Cooked Meals', user: 'Anjali Patel', distance: '1.5 km' },
  { id: '6', lat: 12.9340, lng: 77.6290, type: 'request', title: 'Rice & Groceries', user: 'Lakshmi Reddy', distance: '1.4 km' },
];

export default function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [acceptedMarkers, setAcceptedMarkers] = useState<Set<string>>(new Set());
  const [chatMarker, setChatMarker] = useState<MapMarker | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(BANGALORE_CENTER);
  const [mapZoom] = useState(15);
  const { t } = useLanguage();

  const handleAccept = (marker: MapMarker) => {
    setAcceptedMarkers(new Set([...acceptedMarkers, marker.id]));
    setChatMarker(marker);
    setSelectedMarker(null);
  };

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
  };

  const handleRecenterMap = () => {
    // Try to get the user's current geolocation and recenter the map
    if (!('geolocation' in navigator)) {
      // Fallback: reset to default center
      setMapCenter(BANGALORE_CENTER);
      console.warn('Geolocation not available, using default center');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapCenter([latitude, longitude]);
      },
      (err) => {
        console.warn('Could not get current position:', err.message);
        // On error (permission denied, timeout), keep current center or fallback
        // Optionally reset to default
        // setMapCenter(BANGALORE_CENTER);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
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
    <ScreenContainer>
      {/* Leaflet Map */}
      <div className="absolute inset-0 z-0">
        <LeafletMap
          markers={mapMarkers}
          center={mapCenter}
          zoom={mapZoom}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg z-10 min-w-[120px] shrink-0">
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
      <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg z-10 min-w-[140px] shrink-0">
        <p className="text-gray-900">Within 2 km radius</p>
      </div>

      {/* Current Location Button */}
      <button 
        onClick={handleRecenterMap}
        className="absolute bottom-24 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
      >
        <Navigation className="w-6 h-6 text-[#4c6ef5]" />
      </button>

      {/* Selected Marker Overlay */}
      {selectedMarker && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-5 border-t border-gray-200 z-30 animate-in slide-in-from-bottom min-w-0">
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
    </ScreenContainer>
  );
}
