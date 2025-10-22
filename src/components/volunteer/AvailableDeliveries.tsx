import { useState } from 'react';
import { MapPin, Clock, Package, User, Navigation } from 'lucide-react';
import { DeliveryRequest } from '../../types';
import { availableDeliveries } from '../../constants';
import { useLanguage } from '../shared/LanguageContext';

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
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedDelivery.donationTitle}</h3>
              <p className="text-muted-foreground">{selectedDelivery.description}</p>
            </div>

            {/* Pickup Location */}
            <div className="bg-card rounded-lg p-4 border border-border">
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
              </div>
            </div>

            {/* Delivery Location */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <Navigation className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t.deliverTo || 'Deliver To'}</p>
                  <p className="text-base font-medium">{selectedDelivery.recipient}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedDelivery.recipientLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">{t.distance || 'Distance'}</p>
                <p className="text-lg font-semibold">{selectedDelivery.distance}</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1">{t.estimatedTime || 'Est. Time'}</p>
                <p className="text-lg font-semibold">{selectedDelivery.estimatedDeliveryTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Accept Button */}
        <div className="p-4 border-t border-border bg-card">
          <button
            onClick={() => handleAcceptDelivery(selectedDelivery.id)}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t.acceptDelivery || 'Accept Delivery'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <h2 className="text-lg font-semibold">{t.availableDeliveries || 'Available Deliveries'}</h2>
        <p className="text-sm text-muted-foreground">
          {deliveries.length} {t.deliveriesNeedHelp || 'deliveries need your help'}
        </p>
      </div>

      {/* Deliveries List */}
      <div className="flex-1 overflow-y-auto">
        {deliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t.noDeliveries || 'No Deliveries Available'}</h3>
            <p className="text-muted-foreground">
              {t.checkBackLater || 'Check back later for new delivery requests'}
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
                    <h3 className="font-semibold mb-1 truncate">{delivery.donationTitle}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <User className="w-3 h-3" />
                      <span className="truncate">{delivery.donor}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{delivery.recipientLocation}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        {delivery.distance}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {delivery.estimatedDeliveryTime}
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
