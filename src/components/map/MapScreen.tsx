import { useState } from 'react';
import { ArrowLeft, MapPin, Award, Filter, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { ScreenContainer } from '../shared';

interface MapScreenProps {
  onBack: () => void;
  onSelectDonation: (id: string) => void;
}

const mapPins = [
  { id: '1', x: 35, y: 45, title: 'Emergency Food Support', amount: 95, target: 150, bonusPoints: 50, isInternational: false },
  { id: '2', x: 60, y: 30, title: 'Textbooks Needed', amount: 120, target: 300, bonusPoints: 75, isInternational: true },
  { id: '3', x: 25, y: 65, title: 'Medical Supplies', amount: 180, target: 200, bonusPoints: 60, isInternational: false },
  { id: '4', x: 70, y: 55, title: 'Winter Clothing', amount: 340, target: 500, bonusPoints: 100, isInternational: false },
  { id: '5', x: 45, y: 40, title: 'Rent Assistance', amount: 450, target: 800, bonusPoints: 120, isInternational: true },
];

export default function MapScreen({ onBack, onSelectDonation }: MapScreenProps) {
  const [selectedPin, setSelectedPin] = useState<typeof mapPins[0] | null>(null);
  const [maxDistance, setMaxDistance] = useState([10]);
  const [showInternational, setShowInternational] = useState(true);
  const [showUrgent, setShowUrgent] = useState(true);

  return (
    <ScreenContainer>
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-gray-900">Map View</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Requests</SheetTitle>
                <SheetDescription>Customize what you see on the map</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <Label>Maximum Distance: {maxDistance[0]} km</Label>
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="international"
                    checked={showInternational}
                    onCheckedChange={(checked) => setShowInternational(checked as boolean)}
                  />
                  <Label htmlFor="international" className="cursor-pointer">
                    Show international student requests
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={showUrgent}
                    onCheckedChange={(checked) => setShowUrgent(checked as boolean)}
                  />
                  <Label htmlFor="urgent" className="cursor-pointer">
                    Show urgent requests only
                  </Label>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 min-w-0">
        {/* Simulated Map Background */}
        <div className="absolute inset-0">
          {/* Grid pattern to simulate map */}
          <svg className="w-full h-full" style={{ opacity: 0.3 }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Simulated streets */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#999" strokeWidth="3" />
            <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#999" strokeWidth="2" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#999" strokeWidth="3" />
            <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#999" strokeWidth="2" />
          </svg>
        </div>

        {/* Map Pins */}
        {mapPins.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            className="absolute transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div className="relative">
              {/* Pin */}
              <div className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${
                pin.isInternational ? 'bg-[#7950f2]' : 'bg-[#4c6ef5]'
              }`}>
                {pin.isInternational ? (
                  <Globe className="w-5 h-5 text-white" />
                ) : (
                  <MapPin className="w-5 h-5 text-white" fill="white" />
                )}
              </div>
              {/* Pin tail */}
              <div className={`w-1 h-3 mx-auto ${
                pin.isInternational ? 'bg-[#7950f2]' : 'bg-[#4c6ef5]'
              }`} />
              {/* Bonus points badge */}
              <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white border-0 px-1.5 py-0.5">
                +{pin.bonusPoints}
              </Badge>
            </div>
          </button>
        ))}

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white rounded-xl p-4 shadow-lg">
          <p className="text-gray-900 mb-3">Legend</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#4c6ef5] rounded-full" />
              <span className="text-gray-700">Local Request</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#7950f2] rounded-full" />
              <span className="text-gray-700">International</span>
            </div>
          </div>
        </div>

        {/* Current location indicator */}
        <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75" />
          </div>
        </div>
      </div>

      {/* Selected Pin Details */}
      {selectedPin && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 border-t border-gray-200 min-w-0">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
          
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{selectedPin.title}</h3>
              <div className="flex items-center gap-2">
                {selectedPin.isInternational && (
                  <Badge className="bg-[#7950f2] text-white border-0">
                    <Globe className="w-3 h-3 mr-1" />
                    International
                  </Badge>
                )}
                <Badge className="bg-yellow-500 text-white border-0">
                  <Award className="w-3 h-3 mr-1" />
                  +{selectedPin.bonusPoints}
                </Badge>
              </div>
            </div>
            <button
              onClick={() => setSelectedPin(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">${selectedPin.amount}</span>
              <span className="text-gray-500">${selectedPin.target}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4c6ef5] rounded-full"
                style={{ width: `${(selectedPin.amount / selectedPin.target) * 100}%` }}
              />
            </div>
          </div>

          <Button
            onClick={() => onSelectDonation(selectedPin.id)}
            className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-12 shadow-md"
          >
            View Details
          </Button>
        </div>
      )}
    </ScreenContainer>
  );
}
