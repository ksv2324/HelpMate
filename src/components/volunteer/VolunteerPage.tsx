import { useState } from 'react';
import { Package, Truck } from 'lucide-react';
import { VolunteerSubTab } from '../../types';
import { useLanguage } from '../shared/LanguageContext';
import { AvailableDeliveries } from './AvailableDeliveries';
import { MyDeliveries } from './MyDeliveries';

export const VolunteerPage = () => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<VolunteerSubTab>('available');

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Sub-tab Navigation */}
      <div className="bg-card border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveSubTab('available')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${
              activeSubTab === 'available'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              <span>{t.available || 'Available'}</span>
            </div>
            {activeSubTab === 'available' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveSubTab('myDeliveries')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${
              activeSubTab === 'myDeliveries'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              <span>{t.myDeliveries || 'My Deliveries'}</span>
            </div>
            {activeSubTab === 'myDeliveries' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeSubTab === 'available' ? <AvailableDeliveries /> : <MyDeliveries />}
      </div>
    </div>
  );
};
