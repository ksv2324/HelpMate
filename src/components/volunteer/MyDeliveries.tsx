import { useState } from 'react';
import { MapPin, Clock, Package, CheckCircle, Navigation2, Phone, MessageCircle, Map as MapIcon, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { DeliveryRequest } from '../../types';
import { myDeliveries as initialDeliveries } from '../../constants';
import { useLanguage } from '../shared/LanguageContext';
import { ScreenContainer } from '../shared';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const MyDeliveries = () => {
  const { t } = useLanguage();
  const [deliveries] = useState<DeliveryRequest[]>(initialDeliveries);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRequest | null>(null);
  const [showMap, setShowMap] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-blue-50 text-[#4c6ef5]';
      case 'in-progress':
        return 'bg-yellow-50 text-yellow-700';
      case 'completed':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted':
        return t.accepted || 'Accepted';
      case 'in-progress':
        return t.inProgress || 'In Progress';
      case 'completed':
        return t.completed || 'Completed';
      default:
        return status;
    }
  };

  const handleStartDelivery = (delivery: DeliveryRequest) => {
    setSelectedDelivery(delivery);
    setShowMap(true);
  };

  if (showMap && selectedDelivery) {
    return (
      <ScreenContainer className="bg-gray-50">
        {/* Map Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => {
              setShowMap(false);
              setSelectedDelivery(null);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">{t.navigation || 'Navigation'}</h2>
        </div>

        {/* Map Placeholder */}
        <div className="flex-1 relative bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <MapIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-900 font-medium mb-2">{t.navigation || 'Navigation'}</p>
              <p className="text-sm text-gray-600">
                {selectedDelivery.donorLocation} → {selectedDelivery.recipientLocation}
              </p>
              <p className="text-sm font-semibold text-[#4c6ef5] mt-2">{selectedDelivery.distance}</p>
            </div>
          </div>
          
          {/* Floating Info Card */}
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <ImageWithFallback
                src={selectedDelivery.donationImage}
                alt={selectedDelivery.donationTitle}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate mb-1">{selectedDelivery.donationTitle}</h3>
                <p className="text-sm text-gray-600">{selectedDelivery.distance}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button className="bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-10">
                <Phone className="w-4 h-4 mr-2" />
                {t.call || 'Call'}
              </Button>
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 h-10">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t.message || 'Message'}
              </Button>
            </div>
          </div>
        </div>
      </ScreenContainer>
    );
  }

  if (selectedDelivery && !showMap) {
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
            <div className="absolute top-3 right-3">
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusColor(selectedDelivery.status)}`}>
                {getStatusLabel(selectedDelivery.status)}
              </span>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedDelivery.donationTitle}</h3>
              <p className="text-gray-600">{selectedDelivery.description}</p>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
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
                {selectedDelivery.status !== 'accepted' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="ml-6 border-l-2 border-dashed border-gray-300 h-6"></div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Navigation2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{t.deliverTo || 'Deliver To'}</p>
                  <p className="text-base font-medium text-gray-900">{selectedDelivery.recipient}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedDelivery.recipientLocation}
                  </p>
                </div>
                {selectedDelivery.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">{t.distance || 'Distance'}</p>
                <p className="text-lg font-semibold text-gray-900">{selectedDelivery.distance}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">{t.acceptedAt || 'Accepted'}</p>
                <p className="text-lg font-semibold text-gray-900">{selectedDelivery.acceptedAt}</p>
              </div>
            </div>
          </div>

          {/* Bottom padding for buttons */}
          <div className="h-32"></div>
        </div>

        {/* Fixed Action Buttons */}
        {selectedDelivery.status !== 'completed' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 space-y-2">
            <Button
              onClick={() => handleStartDelivery(selectedDelivery)}
              className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-11"
            >
              <Navigation2 className="w-5 h-5 mr-2" />
              {selectedDelivery.status === 'accepted' 
                ? t.startDelivery || 'Start Delivery'
                : t.viewMap || 'View Map'
              }
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 h-10">
                <Phone className="w-4 h-4 mr-2" />
                {t.callDonor || 'Call Donor'}
              </Button>
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 h-10">
                <Phone className="w-4 h-4 mr-2" />
                {t.callRecipient || 'Call Recipient'}
              </Button>
            </div>
          </div>
        )}
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-gray-50">
      <div className="flex-1 overflow-auto min-w-0">
        {/* Info Box */}
        <div className="p-4">
          <div className="bg-linear-to-r from-[#4c6ef5] to-[#7950f2] rounded-2xl p-4 text-white shadow-md">
            <h3 className="mb-1">{t.myDeliveries || 'My Deliveries'}</h3>
            <p className="text-white/90">
              {deliveries.length} {t.activeDeliveries || 'active deliveries'}
            </p>
          </div>
        </div>

        {/* Deliveries List */}
        {deliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Package className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.noActiveDeliveries || 'No Active Deliveries'}</h3>
            <p className="text-gray-600">
              {t.acceptDeliveriesToSee || 'Accept deliveries to see them here'}
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
                    className="absolute top-3 right-3"
                  >
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusColor(delivery.status)}`}>
                      {getStatusLabel(delivery.status)}
                    </span>
                  </motion.div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-gray-900 mb-1">{delivery.donationTitle}</h3>
                  <div className="flex items-center gap-1 text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{delivery.recipientLocation}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{delivery.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-blue-50 text-[#4c6ef5] px-3 py-1.5 rounded-full font-medium">
                      {delivery.distance}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {delivery.acceptedAt}
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
