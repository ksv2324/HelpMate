import { MapPin, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../shared/LanguageContext';
import { Donation } from '../../types';

interface DonationListProps {
  donations: Donation[];
  acceptedDonations: Set<string>;
  onAccept: (donation: Donation) => void;
  onOpenChat: (donation: Donation) => void;
}

export default function DonationList({
  donations,
  acceptedDonations,
  onAccept,
  onOpenChat
}: DonationListProps) {
  const { t } = useLanguage();

  return (
    <div className="px-4 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">{t.nearbyDonations}</h3>
        <span className="text-gray-500">{donations.length} available</span>
      </div>
      
      <div className="space-y-4">
        {donations.map((donation) => {
          const isAccepted = acceptedDonations.has(donation.id);
          
          return (
            <div 
              key={donation.id} 
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {donation.distance}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-gray-900 mb-1">{donation.title}</h3>
                <p className="text-gray-600 mb-2">
                  by {donation.donor || t.anonymous}
                </p>
                <div className="flex items-center gap-1 text-gray-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{donation.location}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{donation.description}</p>
                
                {!isAccepted ? (
                  <Button
                    onClick={() => onAccept(donation)}
                    className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-11"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t.acceptChat}
                  </Button>
                ) : (
                  <Button
                    onClick={() => onOpenChat(donation)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-11"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Open Chat
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
