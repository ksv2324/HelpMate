import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Heart, Gift } from 'lucide-react';
import { renderToString } from 'react-dom/server';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'donation' | 'request';
  title: string;
  user: string;
  distance: string;
}

interface LeafletMapProps {
  markers: MapMarker[];
  center: [number, number];
  zoom: number;
  onMarkerClick: (marker: MapMarker) => void;
  onLocationClick?: () => void;
}

// Create custom icons
const createCustomIcon = (type: 'donation' | 'request') => {
  const color = type === 'donation' ? '#4c6ef5' : '#10b981';
  const icon = type === 'donation' ? Heart : Gift;
  
  const iconHtml = renderToString(
    <div style={{
      width: '40px',
      height: '40px',
      backgroundColor: color,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {type === 'donation' ? (
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        ) : (
          <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        )}
      </svg>
      <div style={{
        width: '4px',
        height: '12px',
        backgroundColor: color,
        position: 'absolute',
        bottom: '-12px',
        left: '50%',
        transform: 'translateX(-50%)'
      }}></div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -52]
  });
};

export default function LeafletMap({ markers, center, zoom, onMarkerClick, onLocationClick }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: false, // We'll add custom controls
      attributionControl: true
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add current location marker
    const currentLocationIcon = L.divIcon({
      html: `
        <div style="position: relative;">
          <div style="
            width: 16px;
            height: 16px;
            background-color: #2563eb;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          "></div>
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 16px;
            height: 16px;
            background-color: #2563eb;
            border-radius: 50%;
            opacity: 0.3;
            animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
        </div>
      `,
      className: 'current-location-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    L.marker(center, { icon: currentLocationIcon })
      .addTo(map)
      .bindPopup('Your Location');

    // Add 2km radius circle
    L.circle(center, {
      color: '#4c6ef5',
      fillColor: '#4c6ef5',
      fillOpacity: 0.1,
      radius: 2000 // 2km in meters
    }).addTo(map);

    mapRef.current = map;

    // Add CSS animation for ping effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ping {
        75%, 100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      .custom-marker {
        background: none !important;
        border: none !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        padding: 0;
      }
      .leaflet-popup-content {
        margin: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.remove();
      mapRef.current = null;
      document.head.removeChild(style);
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    
    // Clear existing markers (except current location and circle)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer.getLatLng().lat !== center[0]) {
        map.removeLayer(layer);
      }
    });

    // Add markers
    markers.forEach((marker) => {
      const icon = createCustomIcon(marker.type);
      const leafletMarker = L.marker([marker.lat, marker.lng], { icon })
        .addTo(map)
        .on('click', () => onMarkerClick(marker));

      // Add tooltip on hover
      leafletMarker.bindTooltip(marker.title, {
        permanent: false,
        direction: 'top',
        offset: [0, -52]
      });
    });
  }, [markers, onMarkerClick, center]);

  // Update map view when center or zoom changes
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
}
