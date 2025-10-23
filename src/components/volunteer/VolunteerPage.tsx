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
    <div className="h-full flex flex-col bg-white">
      {/* Sub-tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveSubTab('available')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${
              activeSubTab === 'available'
                ? 'text-[#4c6ef5]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              <span className="text-sm">{t.available || 'Available'}</span>
            </div>
            {activeSubTab === 'available' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4c6ef5]"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveSubTab('myDeliveries')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${
              activeSubTab === 'myDeliveries'
                ? 'text-[#4c6ef5]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              <span className="text-sm">{t.myDeliveries || 'My Deliveries'}</span>
            </div>
            {activeSubTab === 'myDeliveries' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4c6ef5]"></div>
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
