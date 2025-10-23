import { useState } from 'react';
import { MapPin, Clock, Package, User, Navigation, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { DeliveryRequest } from '../../types';
import { availableDeliveries } from '../../constants';
import { useLanguage } from '../shared/LanguageContext';
import { ScreenContainer } from '../shared';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const AvailableDeliveries = () => {
  const { t } = useLanguage();
  const [deliveries, setDeliveries] = useState<DeliveryRequest[]>(availableDeliveries);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRequest | null>(null);

  const handleAcceptDelivery = (deliveryId: string) => {
    setDeliveries(prev => prev.filter(d => d.id !== deliveryId));
    setSelectedDelivery(null);
    // In real app, would save to myDeliveries and update backend
  };

  if (selectedDelivery) {
    return (
      <ScreenContainer className="bg-gray-50">
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
            <button
              onClick={() => setSelectedDelivery(null)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">{t.deliveryDetails || 'Delivery Details'}</h2>
          </div>

          {/* Hero Image */}
          <div className="relative h-64">
            <ImageWithFallback
              src={selectedDelivery.donationImage} 
              alt={selectedDelivery.donationTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {selectedDelivery.distance}
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedDelivery.donationTitle}</h3>
              <p className="text-gray-600">{selectedDelivery.description}</p>
            </div>

            {/* Pickup Location */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Package className="w-5 h-5 text-[#4c6ef5]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{t.pickupFrom || 'Pickup From'}</p>
                  <p className="text-base font-medium text-gray-900">{selectedDelivery.donor}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedDelivery.donorLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Navigation className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{t.deliverTo || 'Deliver To'}</p>
                  <p className="text-base font-medium text-gray-900">{selectedDelivery.recipient}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedDelivery.recipientLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">{t.distance || 'Distance'}</p>
                <p className="text-lg font-semibold text-gray-900">{selectedDelivery.distance}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">{t.estimatedTime || 'Est. Time'}</p>
                <p className="text-lg font-semibold text-gray-900">{selectedDelivery.estimatedDeliveryTime}</p>
              </div>
            </div>
          </div>

          {/* Bottom padding for button */}
          <div className="h-24"></div>
        </div>

        {/* Fixed Accept Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <Button
            onClick={() => handleAcceptDelivery(selectedDelivery.id)}
            className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-11"
          >
            {t.acceptDelivery || 'Accept Delivery'}
          </Button>
        </div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-gray-50">
      <div className="flex-1 overflow-auto min-w-0">
        {/* Info Box */}
        <div className="p-4">
          <div className="bg-linear-to-r from-[#4c6ef5] to-[#7950f2] rounded-2xl p-4 text-white shadow-md">
            <h3 className="mb-1">{t.availableDeliveries || 'Available Deliveries'}</h3>
            <p className="text-white/90">
              {deliveries.length} {t.deliveriesNeedHelp || 'deliveries need your help'}
            </p>
          </div>
        </div>

        {/* Deliveries List */}
        {deliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Package className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.noDeliveries || 'No Deliveries Available'}</h3>
            <p className="text-gray-600">
              {t.checkBackLater || 'Check back later for new delivery requests'}
            </p>
          </div>
        ) : (
          <div className="px-4 pb-20 space-y-4">
            {deliveries.map((delivery, index) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDelivery(delivery)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={delivery.donationImage}
                    alt={delivery.donationTitle}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    {delivery.distance}
                  </motion.div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-gray-900 mb-1">{delivery.donationTitle}</h3>
                  <p className="text-gray-600 mb-2">
                    by {delivery.donor}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 mb-3">
                    <Navigation className="w-4 h-4" />
                    <span className="truncate">{delivery.recipientLocation}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{delivery.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-blue-50 text-[#4c6ef5] px-3 py-1.5 rounded-full font-medium">
                      {delivery.distance}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {delivery.estimatedDeliveryTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ScreenContainer>
  );
};
