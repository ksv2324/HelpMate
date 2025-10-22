import { useState } from 'react';
import { MapPin, Clock, Package, CheckCircle, Navigation2, Phone, MessageCircle, Map as MapIcon } from 'lucide-react';
import { DeliveryRequest } from '../../types';
import { myDeliveries as initialDeliveries } from '../../constants';
import { useLanguage } from '../shared/LanguageContext';

export const MyDeliveries = () => {
  const { t } = useLanguage();
  const [deliveries] = useState<DeliveryRequest[]>(initialDeliveries);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRequest | null>(null);
  const [showMap, setShowMap] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-blue-500/10 text-blue-600';
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'completed':
        return 'bg-green-500/10 text-green-600';
      default:
        return 'bg-gray-500/10 text-gray-600';
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
      <div className="h-full flex flex-col bg-background">
        {/* Map Header */}
        <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              setShowMap(false);
              setSelectedDelivery(null);
            }}
            className="text-primary hover:text-primary/80"
          >
            ← {t.back || 'Back'}
          </button>
          <h2 className="text-lg font-semibold">{t.navigation || 'Navigation'}</h2>
          <div className="w-16"></div>
        </div>

        {/* Map Placeholder - In production, integrate with actual map service */}
        <div className="flex-1 relative bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <MapIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-2">{t.navigation || 'Navigation'}</p>
              <p className="text-sm text-gray-500">
                {selectedDelivery.donorLocation} → {selectedDelivery.recipientLocation}
              </p>
              <p className="text-sm font-semibold text-primary mt-2">{selectedDelivery.distance}</p>
            </div>
          </div>
          
          {/* Floating Info Card */}
          <div className="absolute bottom-4 left-4 right-4 bg-card rounded-lg shadow-lg p-4 border border-border">
            <div className="flex items-start gap-3 mb-3">
              <img
                src={selectedDelivery.donationImage}
                alt={selectedDelivery.donationTitle}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate mb-1">{selectedDelivery.donationTitle}</h3>
                <p className="text-sm text-muted-foreground">{selectedDelivery.distance}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                <Phone className="w-4 h-4" />
                {t.call || 'Call'}
              </button>
              <button className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium hover:bg-secondary/80">
                <MessageCircle className="w-4 h-4" />
                {t.message || 'Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedDelivery && !showMap) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSelectedDelivery(null)}
            className="text-primary hover:text-primary/80"
          >
            ← {t.back || 'Back'}
          </button>
          <h2 className="text-lg font-semibold">{t.deliveryDetails || 'Delivery Details'}</h2>
          <div className="w-16"></div>
        </div>

        {/* Details Content */}
        <div className="flex-1 overflow-y-auto">
          <img 
            src={selectedDelivery.donationImage} 
            alt={selectedDelivery.donationTitle}
            className="w-full h-48 object-cover"
          />
          
          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedDelivery.donationTitle}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(selectedDelivery.status)}`}>
                  {getStatusLabel(selectedDelivery.status)}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground">{selectedDelivery.description}</p>

            {/* Timeline */}
            <div className="bg-card rounded-lg p-4 border border-border space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t.pickupFrom || 'Pickup From'}</p>
                  <p className="text-base font-medium">{selectedDelivery.donor}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedDelivery.donorLocation}
                  </p>
                </div>
                {selectedDelivery.status !== 'accepted' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="ml-6 border-l-2 border-dashed border-border h-6"></div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <Navigation2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t.deliverTo || 'Deliver To'}</p>
                  <p className="text-base font-medium">{selectedDelivery.recipient}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
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
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">{t.distance || 'Distance'}</p>
                <p className="text-lg font-semibold">{selectedDelivery.distance}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">{t.acceptedAt || 'Accepted'}</p>
                <p className="text-lg font-semibold">{selectedDelivery.acceptedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {selectedDelivery.status !== 'completed' && (
          <div className="p-4 border-t border-border bg-card space-y-2">
            <button
              onClick={() => handleStartDelivery(selectedDelivery)}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Navigation2 className="w-5 h-5" />
              {selectedDelivery.status === 'accepted' 
                ? t.startDelivery || 'Start Delivery'
                : t.viewMap || 'View Map'
              }
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium hover:bg-secondary/80">
                <Phone className="w-4 h-4" />
                {t.callDonor || 'Call Donor'}
              </button>
              <button className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-medium hover:bg-secondary/80">
                <Phone className="w-4 h-4" />
                {t.callRecipient || 'Call Recipient'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <h2 className="text-lg font-semibold">{t.myDeliveries || 'My Deliveries'}</h2>
        <p className="text-sm text-muted-foreground">
          {deliveries.length} {t.activeDeliveries || 'active deliveries'}
        </p>
      </div>

      {/* Deliveries List */}
      <div className="flex-1 overflow-y-auto">
        {deliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t.noActiveDeliveries || 'No Active Deliveries'}</h3>
            <p className="text-muted-foreground">
              {t.acceptDeliveriesToSee || 'Accept deliveries to see them here'}
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {deliveries.map(delivery => (
              <div
                key={delivery.id}
                onClick={() => setSelectedDelivery(delivery)}
                className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex gap-3 p-3">
                  <img
                    src={delivery.donationImage}
                    alt={delivery.donationTitle}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold truncate flex-1">{delivery.donationTitle}</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(delivery.status)}`}>
                      {getStatusLabel(delivery.status)}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{delivery.recipientLocation}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        {delivery.distance}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {delivery.acceptedAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
