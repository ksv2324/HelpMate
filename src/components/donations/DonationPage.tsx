import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { ChatBox } from '../chat';
import DonationList from './DonationList';
import DonationForm from './DonationForm';
import { useLanguage } from '../shared/LanguageContext';
import { ScreenContainer } from '../shared';
import { DONATIONS } from '../../constants/donations';
import { Donation } from '../../types';

export default function DonationPage() {
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [acceptedDonations, setAcceptedDonations] = useState<Set<string>>(new Set());
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const { t } = useLanguage();

  const handleAccept = (donation: Donation) => {
    setAcceptedDonations(new Set([...acceptedDonations, donation.id]));
    setSelectedDonation(donation);
  };

  const handleSubmitDonation = (data: { title: string; donorName: string; description: string; location: string }) => {
    // TODO: Add API call to submit donation
    console.log('Submitting donation:', data);
  };

  if (selectedDonation) {
    return (
      <ChatBox 
        item={selectedDonation} 
        type="donation"
        onClose={() => setSelectedDonation(null)} 
      />
    );
  }

  if (showAddDonation) {
    return (
      <DonationForm 
        onClose={() => setShowAddDonation(false)}
        onSubmit={handleSubmitDonation}
      />
    );
  }

  return (
    <ScreenContainer className="bg-gray-50">
      {/* Content */}
      <div className="flex-1 overflow-auto min-w-0">
        {/* Info Box */}
        <div className="p-4">
          <div className="bg-linear-to-r from-[#4c6ef5] to-[#7950f2] rounded-2xl p-4 text-white shadow-md">
            <h3 className="mb-1">{t.nearbyDonations}</h3>
            <p className="text-white/90">
              Browse items available within 1-2 km. Accept to unlock chat with donors.
            </p>
          </div>
        </div>

        <DonationList
          donations={DONATIONS}
          acceptedDonations={acceptedDonations}
          onAccept={handleAccept}
          onOpenChat={setSelectedDonation}
        />
      </div>

      {/* Floating Add Button */}
      <motion.button
        onClick={() => setShowAddDonation(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-6 right-6 w-14 h-14 bg-[#4c6ef5] rounded-full flex items-center justify-center shadow-lg hover:bg-[#4263eb] transition-colors"
      >
        <Plus className="w-7 h-7 text-white" />
      </motion.button>
    </ScreenContainer>
  );
}
